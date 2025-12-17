<?php

namespace App\Http\Controllers;

use App\Models\FormCode;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FormCodeController extends Controller
{
    public function index()
    {
        // Load translations for form codes page
        if (function_exists('syncLangFiles')) {
            syncLangFiles('formcodes');
        }

        $codes = FormCode::with('admin')
            ->orderBy('created_at', 'desc')
            ->get();

        $payload = $codes->map(function ($c) {
            return [
                'id'              => $c->id,
                'code'            => $c->code,
                'uses'            => (int) $c->uses,
                'user_created'    => $c->user_created,
                'expiration_date' => $c->expiration_date ? $c->expiration_date->toDateTimeString() : null,
                'created_at'      => $c->created_at ? $c->created_at->toDateTimeString() : null,
                'admin'           => $c->admin ? [
                    'id'    => $c->admin->id,
                    'email' => $c->admin->email,
                ] : null,
                'form' => $c->form ? [
                    'id' => $c->form->id,
                    'title' => $c->form->title[app()->getLocale()] ?? $c->form->title['lv'] ?? 'No title',
                ] : null,
            ];
        });

        // only pass private forms for assignment
        $forms = Form::where('code', 'private')->get()->map(function ($f) {
            return [
                'id' => $f->id,
                'title' => $f->title[app()->getLocale()] ?? $f->title['lv'] ?? 'No title',
            ];
        });

        return inertia('Admin/formCodes', [
            'codes' => $payload,
            'forms' => $forms,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'uses'             => 'required|integer|min:1',
            'expiration_hours' => 'required|integer|min:1',
            'form_id'          => 'nullable|integer|exists:forms,id',
            'code'             => [
                'nullable',
                'string',
                'size:12',
                'regex:/^\S+$/',
                'unique:form_codes,code',
            ],
        ]);

        $formId = $request->input('form_id');

        // If a form_id is provided, require that the form is private
        if ($formId) {
            $form = Form::find($formId);
            if (! $form || ($form->code ?? '') !== 'private') {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only assign codes to private surveys.',
                ], 422);
            }
        }

        $expiration = now()->addHours($request->expiration_hours);

        $userId = session('admin_id');

        $code = FormCode::create([
            'code' => strtoupper(
                $request->filled('code')
                    ? $request->code
                    : Str::random(12)
            ),
            'user_created'    => $userId,
            'expiration_date' => $expiration,
            'uses'            => $request->uses,
            'form_id'         => $request->form_id ?? null,
        ]);

        // load relations
        $code->load('admin', 'form');

        $response = [
            'id'              => $code->id,
            'code'            => $code->code,
            'uses'            => (int) $code->uses,
            'user_created'    => $code->user_created,
            'expiration_date' => $code->expiration_date ? $code->expiration_date->toDateTimeString() : null,
            'created_at'      => $code->created_at ? $code->created_at->toDateTimeString() : null,
            'admin'           => $code->admin ? [
                'id'    => $code->admin->id,
                'email' => $code->admin->email,
            ] : null,
            'form_id'         => $code->form_id ?? null,
        ];

        return response()->json([
            'success' => true,
            'code'    => $response,
        ]);
    }

    public function verify(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'min:1', 'max:255'],
            'form_id' => 'nullable|integer|exists:forms,id',
        ]);

        $codeInput = strtoupper(trim($data['code']));
        $expectedFormId = $data['form_id'] ?? null;

        return DB::transaction(function () use ($codeInput, $expectedFormId) {
            $formCode = FormCode::where('code', $codeInput)
                ->lockForUpdate()
                ->first();

            if (! $formCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods nav derīgs.',
                ], 422);
            }

            if ($expectedFormId && (int)$formCode->form_id !== (int)$expectedFormId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods nepieder šai anketai.',
                ], 422);
            }

            $expiresAt = $formCode->expiration_date ? Carbon::parse($formCode->expiration_date) : null;
            if ($expiresAt && $expiresAt->isPast()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods ir beidzies.',
                ], 422);
            }

            if ((int) $formCode->uses <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods vairs nav derīgs (izmantots).',
                ], 422);
            }

            $formCode->uses = max(0, (int) $formCode->uses - 1);
            $formCode->save();

            // load form relation
            $formCode->load('form');

            return response()->json([
                'success'        => true,
                'remaining_uses' => (int) $formCode->uses,
                'expires_at'     => $expiresAt ? $expiresAt->toDateTimeString() : null,
                'code'           => $formCode->code,
                'form_id'        => $formCode->form_id ?? null,
                'form'           => $formCode->form ? [
                    'id'     => $formCode->form->id,
                    'title'  => $formCode->form->title,
                    'fields' => $formCode->form->fields ?? [],
                    'lang'   => app()->getLocale(),
                ] : null,
            ]);
        });
    }
    public function destroy($id): JsonResponse
{
    try {
        $code = FormCode::findOrFail($id);

        $code->delete(); // or forceDelete() if you use SoftDeletes

        return response()->json(['success' => true]);
    } catch (\Exception $e) {
        \Log::error("Failed to delete FormCode ID {$id}: {$e->getMessage()}");
        return response()->json([
            'success' => false,
            'message' => 'Failed to delete code. Check server logs.',
        ], 500);
    }
}

}

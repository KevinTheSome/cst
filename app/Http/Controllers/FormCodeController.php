<?php

namespace App\Http\Controllers;

use App\Models\FormCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class FormCodeController extends Controller
{
    public function index()
    {
        syncLangFiles('formcodes');

        $codes = FormCode::with('admin')->orderBy('created_at', 'desc')->get();

        $payload = $codes->map(function ($c) {
            return [
                'id' => $c->id,
                'code' => $c->code,
                'uses' => (int) $c->uses,
                'user_created' => $c->user_created,
                'expiration_date' => $c->expiration_date ? $c->expiration_date->toDateTimeString() : null,
                'created_at' => $c->created_at ? $c->created_at->toDateTimeString() : null,
                'admin' => $c->admin ? [
                    'id' => $c->admin->id,
                    'email' => $c->admin->email,
                ] : null,
            ];
        });

        return inertia('Admin/formCodes', [
            'codes' => $payload
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'uses' => 'required|integer|min:1',
            'expiration_hours' => 'required|integer|min:1',
        ]);

        $expiration = now()->addHours($request->expiration_hours);

        $userId = session('admin_id');

        $code = FormCode::create([
            'code' => strtoupper(Str::random(12)),
            'user_created' => $userId,
            'expiration_date' => $expiration,
            'uses' => $request->uses,
        ]);

        // load user relation
        $code->load('admin');

        $response = [
            'id' => $code->id,
            'code' => $code->code,
            'uses' => (int) $code->uses,
            'user_created' => $code->user_created,
            'expiration_date' => $code->expiration_date ? $code->expiration_date->toDateTimeString() : null,
            'created_at' => $code->created_at ? $code->created_at->toDateTimeString() : null,
            'admin' => $code->admin ? [
                'id' => $code->admin->id,
                'email' => $code->admin->email,
            ] : null,
        ];

        return response()->json([
            'success' => true,
            'code' => $response,
        ]);
    }

    public function destroy(FormCode $formCode): JsonResponse
    {
        $formCode->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function verify(Request $request): JsonResponse
    {
        $data = $request->validate([
            'code' => ['required', 'string', 'min:1', 'max:255'],
        ]);

        $codeInput = strtoupper(trim($data['code']));

        // Use a transaction to avoid race conditions when decrementing uses
        return DB::transaction(function () use ($codeInput) {
            $formCode = FormCode::where('code', $codeInput)
                ->lockForUpdate()
                ->first();

            if (! $formCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods nav derīgs.',
                ], 422);
            }

            $expiresAt = $formCode->expiration_date ? Carbon::parse($formCode->expiration_date) : null;
            if ($expiresAt && $expiresAt->isPast()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods ir beidzies.',
                ], 422);
            }

            if ((int)$formCode->uses <= 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Kods vairs nav derīgs (izmantots).',
                ], 422);
            }

            // decrement uses and save
            $formCode->uses = max(0, (int)$formCode->uses - 1);
            $formCode->save();

            return response()->json([
                'success' => true,
                'remaining_uses' => (int)$formCode->uses,
                'expires_at' => $expiresAt ? $expiresAt->toDateTimeString() : null,
                'code' => $formCode->code,
            ]);
        });
    }
}

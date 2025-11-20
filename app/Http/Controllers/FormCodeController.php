<?php

namespace App\Http\Controllers;

use App\Models\FormCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB; // <- added

class FormCodeController extends Controller
{
    public function index()
    {
        // eager load the user relation so frontend can show email
        $codes = FormCode::with('user')->orderBy('created_at', 'desc')->get();

        // Map to simple arrays to avoid sending entire Eloquent objects (optional but cleaner)
        $payload = $codes->map(function ($c) {
            return [
                'id' => $c->id,
                'code' => $c->code,
                'uses' => (int) $c->uses,
                'user_created' => $c->user_created,
                'expiration_date' => $c->expiration_date ? $c->expiration_date->toDateTimeString() : null,
                'created_at' => $c->created_at ? $c->created_at->toDateTimeString() : null,
                // include the creator email if available
                'user' => $c->user ? ['id' => $c->user->id, 'email' => $c->user->email] : null,
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

        $code = FormCode::create([
            'code' => strtoupper(Str::random(12)),
            'user_created' => auth()->id() ?? 0,
            'expiration_date' => $expiration,
            'uses' => $request->uses,
        ]);

        // load the user relation (will be null if user_created == 0)
        $code->load('user');

        // return a plain array similar to index mapping
        $response = [
            'id' => $code->id,
            'code' => $code->code,
            'uses' => (int) $code->uses,
            'user_created' => $code->user_created,
            'expiration_date' => $code->expiration_date ? $code->expiration_date->toDateTimeString() : null,
            'created_at' => $code->created_at ? $code->created_at->toDateTimeString() : null,
            'user' => $code->user ? ['id' => $code->user->id, 'email' => $code->user->email] : null,
        ];

        return response()->json([
            'success' => true,
            'code' => $response,
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

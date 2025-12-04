<?php

namespace App\Http\Controllers;

use App\Models\OnlineCode;
use App\Models\OnlineTraining;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class LectureController extends Controller
{
    /**
     * Show list UI (Inertia)
     */
    public function index()
    {
        $codes = OnlineCode::orderBy('created_at', 'desc')->get();
        $trainings = \App\Models\OnlineTraining::orderBy('starts_at', 'desc')->get();

        return Inertia::render('Admin/Apmaciba/lectureCode', [
            'codes' => $codes,
            'trainings' => $trainings,
        ]);
    }

    /**
     * Create a new code
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'nullable|string|unique:online_codes,code',
            'online_training_ids' => 'nullable|array',
            'online_training_ids.*' => 'integer|exists:online_trainings,id',
            'max_uses' => 'nullable|integer|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'sometimes|boolean',
        ]);

        // Auto-generate code if empty
        if (empty($data['code'])) {
            do {
                $generated = strtoupper(Str::random(8));
            } while (OnlineCode::where('code', $generated)->exists());
            $data['code'] = $generated;
        }

        // Create code
        $code = OnlineCode::create([
            'code' => $data['code'],
            'max_uses' => $data['max_uses'] ?? 0,
            'used_count' => 0,
            'valid_from' => $data['valid_from'] ?? null,
            'valid_until' => $data['valid_until'] ?? null,
            'is_active' => $data['is_active'] ?? true,
            'online_training_ids' => $data['online_training_ids'] ?? [],
        ]);

        return response()->json(['ok' => true, 'code' => $code], 201);
    }

    /**
     * Show single code (json)
     */
    public function show($id)
    {
        $code = OnlineCode::findOrFail($id);
        return response()->json(['ok' => true, 'code' => $code], 200);
    }

    /**
     * Update existing
     */
    public function update(Request $request, $id)
    {
        $code = OnlineCode::findOrFail($id);

        $data = $request->validate([
            'code' => ['nullable', 'string', Rule::unique('online_codes', 'code')->ignore($code->id)],
            'online_training_ids' => 'nullable|array',
            'online_training_ids.*' => 'nullable|integer|exists:online_trainings,id',
            'max_uses' => 'nullable|integer|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'sometimes|boolean',
        ]);

        $code->code = $data['code'] ?? $code->code;
        $code->online_training_ids = $data['online_training_ids'] ?? $code->online_training_ids;
        $code->max_uses = $data['max_uses'] ?? $code->max_uses;
        $code->valid_from = $data['valid_from'] ?? $code->valid_from;
        $code->valid_until = $data['valid_until'] ?? $code->valid_until;
        if (isset($data['is_active'])) {
            $code->is_active = (bool) $data['is_active'];
        }

        $code->save();

        return response()->json(['ok' => true, 'code' => $code], 200);
    }

    /**
     * Delete
     */
    public function destroy($id)
    {
        $code = OnlineCode::findOrFail($id);
        $code->delete();

        return response()->json(['ok' => true], 200);
    }

    /**
     * Verify a lecture code for public access
     */
    public function verifyCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $code = OnlineCode::where('code', strtoupper(trim($request->code)))->first();

        if (!$code) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid code',
            ], 404);
        }

        if (!$code->isValidNow()) {
            return response()->json([
                'valid' => false,
                'message' => 'Code is expired or inactive',
            ], 403);
        }

        // Update usage tracking
        $code->used_count += 1;
        $code->last_used_at = now();
        $code->last_used_by = $request->ip(); // or user ID if authenticated
        $code->save();

        $lectures = [];

        if (!empty($code->online_training_ids)) {
            // Only return trainings assigned to this code
            $trainings = OnlineTraining::whereIn('id', $code->online_training_ids)
                ->where('is_active', true)
                ->get();

            $lectures = $trainings->map(fn($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'description' => $t->description,
                'url' => $t->url,
                'starts_at' => $t->starts_at,
                'ends_at' => $t->ends_at,
            ])->toArray();
        } else {
            // Fallback: all active trainings (for backwards compatibility)
            $trainings = OnlineTraining::where('is_active', true)->get();
            $lectures = $trainings->map(fn($t) => [
                'id' => $t->id,
                'title' => $t->title,
                'description' => $t->description,
                'url' => $t->url,
                'starts_at' => $t->starts_at,
                'ends_at' => $t->ends_at,
            ])->toArray();
        }

        return response()->json([
            'valid' => true,
            'code' => $code,
            'lectures' => $lectures,
        ]);
    }

    /**
     * Regenerate code string (new unique code)
     */
    public function regenerate($id)
    {
        $code = OnlineCode::findOrFail($id);

        do {
            $generated = strtoupper(Str::random(8));
        } while (OnlineCode::where('code', $generated)->exists());

        $code->code = $generated;
        $code->save();

        return response()->json(['ok' => true, 'code' => $code], 200);
    }
}

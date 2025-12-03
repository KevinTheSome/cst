<?php

namespace App\Http\Controllers;

use App\Models\OnlineCode;
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
        // load recent codes (adjust ordering / eager loads as needed)
        $codes = OnlineCode::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Apmaciba/lectureCode', [
            'codes' => $codes,
        ]);
    }

    /**
     * Create a new code
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'nullable|string|unique:online_codes,code',
            'online_training_id' => 'nullable|integer',
            'max_uses' => 'nullable|integer|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'sometimes|boolean',
        ]);

        // generate code if not provided
        if (empty($data['code'])) {
            do {
                $generated = strtoupper(Str::random(8));
            } while (OnlineCode::where('code', $generated)->exists());
            $data['code'] = $generated;
        }

        $code = OnlineCode::create([
            'code' => $data['code'],
            'online_training_id' => $data['online_training_id'] ?? null,
            'max_uses' => $data['max_uses'] ?? 0,
            'used_count' => 0,
            'last_used_by' => null,
            'valid_from' => $data['valid_from'] ?? null,
            'valid_until' => $data['valid_until'] ?? null,
            'last_used_at' => null,
            'is_active' => isset($data['is_active']) ? (bool) $data['is_active'] : true,
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
            'online_training_id' => 'nullable|integer',
            'max_uses' => 'nullable|integer|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'sometimes|boolean',
        ]);

        if (!empty($data['code'])) {
            $code->code = $data['code'];
        }

        $code->online_training_id = $data['online_training_id'] ?? $code->online_training_id;
        $code->max_uses = $data['max_uses'] ?? $code->max_uses;
        $code->valid_from = $data['valid_from'] ?? $code->valid_from;
        $code->valid_until = $data['valid_until'] ?? $code->valid_until;
        if (isset($data['is_active']))
            $code->is_active = (bool) $data['is_active'];

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

        // Return lecture data (mock data for now, can be enhanced later)
        $lectures = [
            [
                'id' => 'l1',
                'title' => 'Ievads ATMP un MSC šūnu terapijā',
                'duration' => '10:24',
                'shortDesc' => 'Kas ir ATMP un kas jāzina pacientam.',
            ],
            [
                'id' => 'l2',
                'title' => 'Klīniskie pētījumi un drošība',
                'duration' => '18:12',
                'shortDesc' => 'Apskats par pierādījumiem un riskiem.',
            ],
            [
                'id' => 'l3',
                'title' => 'Kas notiek procedūras laikā?',
                'duration' => '12:05',
                'shortDesc' => 'Soli pa solim - ko sagaidīt.',
            ],
            [
                'id' => 'l4',
                'title' => 'Biežākie jautājumi un resursi',
                'duration' => '08:40',
                'shortDesc' => 'Praktiski padomi un saites.',
            ],
        ];

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

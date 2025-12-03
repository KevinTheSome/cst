<?php

namespace App\Http\Controllers;

use App\Models\OnlineTraining;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class OnlineTrainingController extends Controller
{
    // GET /admin/trainings
    public function index(Request $request)
    {
        $q = $request->input('q');

        $query = OnlineTraining::query();

        if ($q) {
            $query->where(function ($sub) use ($q) {
                $sub->where('title->lv', 'like', "%{$q}%")
                    ->orWhere('title->en', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%");
            });
        }

        // return a collection (no pagination to keep frontend simple)
        $trainings = $query->orderBy('starts_at', 'desc')->get();

        return Inertia::render('Admin/Apmaciba/indexApmaciba', [
            'trainings' => $trainings,
            'filters' => ['q' => $q ?? ''],
        ]);
    }

    // GET /admin/trainings/create
    public function create()
    {
        return Inertia::render('Admin/Apmaciba/createApmaciba', [
            'training' => null,
        ]);
    }

    // POST /admin/trainings/store
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title.lv' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url|max:1024',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'is_active' => 'nullable|boolean',
        ]);

        // Normalize datetimes
        if (!empty($validated['starts_at'])) {
            $validated['starts_at'] = Carbon::parse($validated['starts_at'])->toDateTimeString();
        }
        if (!empty($validated['ends_at'])) {
            $validated['ends_at'] = Carbon::parse($validated['ends_at'])->toDateTimeString();
        }

        $payload = [
            'title' => [
                'lv' => $validated['title']['lv'] ?? null,
                'en' => $validated['title']['en'] ?? null,
            ],
            'description' => $validated['description'] ?? null,
            'url' => $validated['url'] ?? null,
            'starts_at' => $validated['starts_at'] ?? null,
            'ends_at' => $validated['ends_at'] ?? null,
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : true,
        ];

        OnlineTraining::create($payload);

        return redirect()->route('admin.trainings')->with('success', 'Online training created.');
    }

    // GET /admin/trainings/show/{id}
    public function show($id)
    {
        $training = OnlineTraining::findOrFail($id);

        return Inertia::render('Admin/Apmaciba/showApmaciba', [
            'training' => $training,
        ]);
    }

    // GET /admin/trainings/edit/{id}
    public function edit($id)
    {
        $training = OnlineTraining::findOrFail($id);

        return Inertia::render('Admin/Apmaciba/editApmaciba', [
            'training' => $training,
        ]);
    }

    // PUT /admin/trainings/update/{id}
    public function update(Request $request, $id)
    {
        $training = OnlineTraining::findOrFail($id);

        $validated = $request->validate([
            'title.lv' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url|max:1024',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'is_active' => 'nullable|boolean',
        ]);

        if (!empty($validated['starts_at'])) {
            $validated['starts_at'] = Carbon::parse($validated['starts_at'])->toDateTimeString();
        }
        if (!empty($validated['ends_at'])) {
            $validated['ends_at'] = Carbon::parse($validated['ends_at'])->toDateTimeString();
        }

        $payload = [
            'title' => [
                'lv' => $validated['title']['lv'] ?? ($training->title['lv'] ?? null),
                'en' => $validated['title']['en'] ?? ($training->title['en'] ?? null),
            ],
            'description' => $validated['description'] ?? $training->description,
            'url' => $validated['url'] ?? $training->url,
            'starts_at' => $validated['starts_at'] ?? $training->starts_at,
            'ends_at' => $validated['ends_at'] ?? $training->ends_at,
            'is_active' => isset($validated['is_active']) ? (bool)$validated['is_active'] : $training->is_active,
        ];

        $training->update($payload);

        return redirect()->route('admin.trainings')->with('success', 'Online training updated.');
    }

    // DELETE /admin/trainings/destroy/{id}
    public function destroy($id)
    {
        $training = OnlineTraining::findOrFail($id);
        $training->delete();

        return redirect()->route('admin.trainings')->with('success', 'Online training deleted.');
    }
}

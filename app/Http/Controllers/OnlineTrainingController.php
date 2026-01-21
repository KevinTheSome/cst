<?php

namespace App\Http\Controllers;

use App\Models\OnlineTraining;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
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
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhere('owner', 'like', "%{$q}%");
            });
        }

        // Get trainings (no pagination to keep frontend simple)
        $trainings = $query->orderBy('starts_at', 'desc')->get();

        // Preload ratings aggregates (count & avg) efficiently
        // withCount and withAvg add attributes ratings_count and ratings_avg
        $trainings = $trainings->loadCount('ratings')->loadAvg('ratings', 'score');

        $ids = $trainings->pluck('id')->all();
        if (!empty($ids)) {
            // Get breakdown grouped by training and score
            $rows = DB::table('ratings')
                ->select('online_training_id', 'score', DB::raw('count(*) as cnt'))
                ->whereIn('online_training_id', $ids)
                ->groupBy('online_training_id', 'score')
                ->get();
        } else {
            $rows = collect();
        }

        // Group rows by training id for easy lookup
        $grouped = $rows->groupBy('online_training_id');

        // Map trainings to plain arrays with rating aggregates
        $out = $trainings->map(function ($t) use ($grouped) {
            $rowsFor = $grouped->get($t->id, collect());

            // build breakdown 1..5
            $breakdown = [];
            for ($s = 1; $s <= 5; $s++) {
                $found = $rowsFor->firstWhere('score', $s);
                $breakdown[$s] = $found ? (int) $found->cnt : 0;
            }

            $count = $t->ratings_count ?? array_sum($breakdown);
            // prefer DB average if present otherwise compute from breakdown
            if (!is_null($t->ratings_avg)) {
                $avg = round((float) $t->ratings_avg, 2);
            } else {
                $total = max(1, $count);
                $avg = $count ? round(
                    (
                        5 * ($breakdown[5] ?? 0) +
                        4 * ($breakdown[4] ?? 0) +
                        3 * ($breakdown[3] ?? 0) +
                        2 * ($breakdown[2] ?? 0) +
                        1 * ($breakdown[1] ?? 0)
                    ) / $total,
                    2
                ) : null;
            }

            return [
                'id' => $t->id,
                'title' => (array) $t->title,
                'description' => $t->description,
                'owner' => $t->owner,
                'url' => $t->url,
                'starts_at' => $t->starts_at,
                'ends_at' => $t->ends_at,
                'is_active' => (bool) $t->is_active,
                // ratings
                'ratings_count' => (int) $count,
                'ratings_avg' => $count ? $avg : null,
                'ratings_breakdown' => $breakdown, // keyed by score 1..5
            ];
        })->values();

        return Inertia::render('Admin/Apmaciba/indexApmaciba', [
            'trainings' => $out,
            'filters' => ['q' => $q ?? ''],
        ]);
    }
    public function lectures(Request $request)
    {
        $title = trim((string) $request->query('title', ''));
        $author = trim((string) $request->query('author', ''));
        $minRating = $request->query('min_rating');
        $minRating = is_numeric($minRating) ? (float) $minRating : 0;
        $debugEnabled = (string) $request->query('debug', '') === '1';

        $ratingsAgg = DB::table('ratings')
            ->select(
                'online_training_id',
                DB::raw('count(*) as ratings_count'),
                DB::raw('avg(score) as ratings_avg_score')
            )
            ->groupBy('online_training_id');

        $query = OnlineTraining::query()
            ->leftJoinSub($ratingsAgg, 'r', function ($join) {
                $join->on('r.online_training_id', '=', 'online_trainings.id');
            })
            ->select('online_trainings.*')
            ->addSelect(DB::raw('COALESCE(r.ratings_count, 0) as ratings_count'))
            ->addSelect(DB::raw('COALESCE(r.ratings_avg_score, 0) as ratings_avg_score'));

        if ($title !== '') {
            $titleNormalized = preg_replace('/\s+/', ' ', $title);
            $titleNormalized = trim((string) $titleNormalized);
            $titleLower = function_exists('mb_strtolower') ? mb_strtolower($titleNormalized) : strtolower($titleNormalized);
            $tokens = preg_split('/\s+/', $titleLower, -1, PREG_SPLIT_NO_EMPTY);

            $driver = DB::connection()->getDriverName();
            if ($driver === 'sqlite') {
                $lvExpr = "lower(json_extract(online_trainings.title, '$.lv'))";
                $enExpr = "lower(json_extract(online_trainings.title, '$.en'))";
            } elseif ($driver === 'mysql') {
                $lvExpr = "lower(JSON_UNQUOTE(JSON_EXTRACT(online_trainings.title, '$.lv')))";
                $enExpr = "lower(JSON_UNQUOTE(JSON_EXTRACT(online_trainings.title, '$.en')))";
            } else {
                $lvExpr = "lower(online_trainings.title->>'lv')";
                $enExpr = "lower(online_trainings.title->>'en')";
            }

            foreach ($tokens as $token) {
                $query->where(function ($sub) use ($lvExpr, $enExpr, $token) {
                    $like = "%{$token}%";
                    $sub->whereRaw("{$lvExpr} like ?", [$like])
                        ->orWhereRaw("{$enExpr} like ?", [$like]);
                });
            }
        }

        if ($author !== '') {
            $query->where('owner', $author);
        }

        if ($minRating > 0) {
            $query->where('r.ratings_avg_score', '>=', $minRating);
        }

        $debug = null;
        if ($debugEnabled) {
            $debug = [
                'min_rating' => $minRating,
                'ratings_total' => (int) DB::table('ratings')->count(),
                'ratings_by_training' => DB::table('ratings')
                    ->select('online_training_id', DB::raw('count(*) as cnt'), DB::raw('avg(score) as avg_score'))
                    ->groupBy('online_training_id')
                    ->orderBy('online_training_id')
                    ->get(),
                'matching_training_ids' => $minRating > 0
                    ? DB::table('ratings')
                        ->select('online_training_id')
                        ->groupBy('online_training_id')
                        ->havingRaw('avg(score) >= ?', [$minRating])
                        ->pluck('online_training_id')
                        ->values()
                    : [],
            ];
        }

        $trainings = $query
            ->orderBy('starts_at', 'desc')
            ->get()
            ->map(function ($training) {
                return [
                    'id' => $training->id,
                    'title' => $training->title,
                    'description' => $training->description,
                    'owner' => $training->owner,
                    'teacher' => $training->owner,
                    'url' => $training->url,
                    'starts_at' => $training->starts_at,
                    'ends_at' => $training->ends_at,
                    'ratings_count' => (int) ($training->ratings_count ?? 0),
                    'rating_avg' => $training->ratings_avg_score !== null ? round((float) $training->ratings_avg_score, 1) : 0,
                ];
            });

        $authors = OnlineTraining::query()
            ->whereNotNull('owner')
            ->where('owner', '!=', '')
            ->distinct()
            ->orderBy('owner')
            ->pluck('owner')
            ->values();

        $unlocked = session('unlocked_lectures', []);
        if (!is_array($unlocked))
            $unlocked = [];
        $unlocked = array_values(array_unique(array_map('intval', $unlocked)));

        return Inertia::render('Specialistiem/apmaciba', [
            'initialLectures' => $trainings,
            'unlockedLectures' => $unlocked,
            'filters' => [
                'title' => $title,
                'author' => $author,
                'min_rating' => $minRating,
            ],
            'authors' => $authors,
            'debug' => $debug,
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
            'owner' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'url' => 'nullable|url|max:1024',
            'is_active' => 'nullable|boolean',
        ]);

        // Normalize datetimes
        // if (!empty($validated['starts_at'])) {
        //     $validated['starts_at'] = Carbon::parse($validated['starts_at'])->toDateTimeString();
        // }
        // if (!empty($validated['ends_at'])) {
        //     $validated['ends_at'] = Carbon::parse($validated['ends_at'])->toDateTimeString();
        // }

        $payload = [
            'title' => [
                'lv' => $validated['title']['lv'] ?? null,
                'en' => $validated['title']['en'] ?? null,
            ],
            'owner' => $validated['owner'] ?? null,
            'description' => $validated['description'] ?? null,
            'url' => $validated['url'] ?? null,
            'starts_at' => $validated['starts_at'] ?? null,
            'ends_at' => $validated['ends_at'] ?? null,
            'is_active' => isset($validated['is_active']) ? (bool) $validated['is_active'] : true,
        ];

        OnlineTraining::create($payload);

        return redirect()->route('admin.trainings')->with('success', 'Online training created.')->with('created', true);
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
            'owner' => 'nullable|string|max:255',
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
            'owner' => $validated['owner'] ?? $training->owner,
            'description' => $validated['description'] ?? $training->description,
            'url' => $validated['url'] ?? $training->url,
            'starts_at' => $validated['starts_at'] ?? $training->starts_at,
            'ends_at' => $validated['ends_at'] ?? $training->ends_at,
            'is_active' => isset($validated['is_active']) ? (bool) $validated['is_active'] : $training->is_active,
        ];

        $training->update($payload);

        return redirect()->route('admin.trainings')->with('success', 'Online training updated.')->with('created', true);
    }

    // DELETE /admin/trainings/destroy/{id}
    public function destroy($id)
    {
        $training = OnlineTraining::findOrFail($id);
        $training->delete();

        return redirect()->route('admin.trainings')->with('success', 'Online training deleted.');
    }
}

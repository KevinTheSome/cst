<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;
use App\Models\OnlineTraining;
use Illuminate\Validation\ValidationException;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'lectureId' => ['required', 'integer', 'exists:online_trainings,id'],
            'rating'    => ['required', 'integer', 'between:1,5'],
        ]);

        $rated = session('rated_lectures', []);

        // Block duplicate rating in this session
        if (isset($rated[$validated['lectureId']])) {
            return response()->json([
                'message' => 'Jūs jau esat novērtējis šo lekciju.',
            ], 409);
        }

        $lecture = OnlineTraining::findOrFail($validated['lectureId']);

        $lecture->ratings()->create([
            'score' => $validated['rating'],
        ]);

        // Mark as rated in session
        $rated[$validated['lectureId']] = true;
        session(['rated_lectures' => $rated]);

        return response()->json([
            'message' => 'Vērtējums saglabāts!',
        ], 201);
    }



    /**
     * Display the specified resource.
     */
    public function show(Rating $rating)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Rating $rating)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Rating $rating)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rating $rating)
    {
        //
    }
}

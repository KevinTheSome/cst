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
        dd($request);
        $validated = $request->validate([
            'lectureId' => ['required', 'integer', 'exists:lectures,id'],
            'rating'    => ['required', 'integer', 'between:1,5'],
        ]);

        $lecture = OnlineTraining::findOrFail($validated['lectureId']);

        // Just create a new rating each time
        $lecture->ratings()->create([
            'score' => $validated['rating'],
        ]);

        return response()->json([
            'message' => 'Rating submitted successfully!',
            'rating'  => $validated['rating'],
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

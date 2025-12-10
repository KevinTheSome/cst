<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TrackRouteHits
{
    public function handle(Request $request, Closure $next)
    {
        $path = $request->path(); // e.g., "dashboard" or "posts/1"

        // Try to increment the hits
        $updated = DB::table('route_hits')
            ->where('path', $path)
            ->increment('hits');

        // If the row didn't exist, insert it with hits = 1
        if ($updated === 0) {
            DB::table('route_hits')->insert([
                'path' => $path,
                'hits' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return $next($request);
    }
}

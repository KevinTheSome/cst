<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;


class VideoController extends Controller
{
    public function generateTempLink($filename)
    {
        $path = 'videos/' . $filename;
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'File not found');
        }

        $token = Str::random(40);
        Cache::put("download:$token", $path);

        return response()->json([
            'token' => $token,
            'url' => url("/download/$token"),
        ]);
    }
    public function downloadTemp($token)
    {
        $cacheKey = "download:$token";

        if (!$path = Cache::pull($cacheKey)) {
            abort(404, 'Link expired or already used');
        }

        return response()->download(Storage::disk('public')->path($path));
    }

}

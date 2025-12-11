<?php

namespace App\Http\Controllers;

use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * User-facing database view
     */
    public function index()
    {
        $locale = app()->getLocale() ?? 'lv';

        $files = StoredFile::orderByDesc('created_at')->get();

        $documents = $files->map(function (StoredFile $file) use ($locale) {
            // Normalize tags (they are stored as JSON / array with lv/en)
            $rawTags = $file->tags ?? [];
            if (! is_array($rawTags)) {
                $decoded = json_decode($rawTags, true);
                $rawTags = is_array($decoded) ? $decoded : [];
            }

            $tags = [];
            $i = 1;
            foreach ($rawTags as $tag) {
                $name = null;

                if (is_array($tag)) {
                    if ($locale === 'en' && ! empty($tag['en'])) {
                        $name = $tag['en'];
                    } elseif (! empty($tag['lv'])) {
                        $name = $tag['lv'];
                    } else {
                        $name = $tag['en'] ?? $tag['lv'] ?? null;
                    }
                } elseif (is_string($tag)) {
                    $name = $tag;
                }

                if ($name) {
                    $tags[] = [
                        'id'   => $i++,
                        'name' => $name,
                    ];
                }
            }

            return [
                'id'           => $file->id,
                'title_lv'     => $file->title_lv,
                'title_en'     => $file->title_en,
                'file_size'    => $file->size ?? 0,
                'mime_type'    => $file->mime_type ?? 'application/octet-stream',
                'created_at'   => optional($file->created_at)->toIso8601String(),
                'download_url' => route('documents.download', ['document' => $file->id]),
                'tags'         => $tags,
            ];
        });

        return Inertia::render('Database/index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Download handler: serve the actual StoredFile uploaded by admin
     */
    public function download($documentId)
    {
        $file = StoredFile::findOrFail($documentId);

        $path = $file->path;

        if (! $path || ! Storage::disk('public')->exists($path)) {
            abort(404, 'File not found on disk.');
        }

        $originalName = pathinfo($path, PATHINFO_BASENAME);
        $ext = pathinfo($path, PATHINFO_EXTENSION);

        // Nice download name based on title_en / title_lv
        $baseTitle = $file->title_en ?: $file->title_lv ?: pathinfo($originalName, PATHINFO_FILENAME);
        $downloadName = Str::slug($baseTitle ?: 'document');
        if ($ext) {
            $downloadName .= '.' . $ext;
        }

        return Storage::disk('public')->download($path, $downloadName);
    }
}

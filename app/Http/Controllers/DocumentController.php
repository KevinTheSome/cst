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
        $storedFiles = \App\Models\StoredFile::all();

        $documents = $storedFiles->map(function ($file) {
            // Convert JSON tags to the format expected by frontend
            $tags = [];
            if ($file->tags) {
                $tagData = $file->tags;
                // If it's a string, decode it from JSON
                if (is_string($tagData)) {
                    $tagData = json_decode($tagData, true);
                }
                // Process tags if we have a valid array
                if (is_array($tagData)) {
                    foreach ($tagData as $index => $tag) {
                        // Handle both simple string tags and complex tag objects with lv/en fields
                        $tagLv = null;
                        $tagEn = null;

                        if (is_string($tag)) {
                            $tagLv = $tag;
                            $tagEn = $tag;
                        } elseif (is_array($tag)) {
                            $tagLv = $tag['lv'] ?? null;
                            $tagEn = $tag['en'] ?? $tag['lv'] ?? null;
                        }

                        if ($tagLv || $tagEn) {
                            $tags[] = [
                                'id' => $index + 1,
                                'name_lv' => trim($tagLv ?? ''),
                                'name_en' => trim($tagEn ?? ''),
                                'name' => trim($tagLv ?? $tagEn ?? '') // Fallback for compatibility
                            ];
                        }
                    }
                }
            }

            return [
                'id' => $file->id,
                'title_lv' => $file->title_lv,
                'title_en' => $file->title_en,
                'file_size' => $file->size,
                'mime_type' => $file->mime_type,
                'created_at' => $file->created_at->toIso8601String(),
                'download_url' => route('documents.download', ['document' => $file->id]),
                'tags' => $tags,
            ];
        });

        return Inertia::render('Database/index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Download handler for stored files
     */
    public function download($documentId)
    {
        $file = \App\Models\StoredFile::findOrFail($documentId);

        $filePath = storage_path('app/public/' . $file->path);

        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return response()->download($filePath, $file->title_lv ?: 'document', [
            'Content-Type' => $file->mime_type ?: 'application/octet-stream',
        ]);
    }
}

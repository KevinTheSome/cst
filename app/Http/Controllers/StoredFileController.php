<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StoredFileController extends Controller
{
    // Show upload form
    public function create()
    {
        return Inertia::render('Admin/Fails/uploadFile');
    }

    // Store uploaded file
    public function store(Request $request)
    {
        $request->validate([
            'title_lv' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'file' => 'required|file|max:10240|mimes:csv,txt,pdf,jpg,jpeg,png,zip,xlsx,xls,doc,docx',
            'tags' => 'nullable',
            'tags.*.lv' => 'nullable|string|max:255',
            'tags.*.en' => 'nullable|string|max:255',
        ]);

        $uploaded = $request->file('file');
        $filePath = $uploaded->store('files', 'public');

        $tags = null;
        if ($request->has('tags')) {
            $incoming = $request->input('tags');
            if (is_array($incoming)) {
                $tags = $incoming;
            } elseif (is_string($incoming)) {
                $decoded = json_decode($incoming, true);
                if (is_array($decoded)) $tags = $decoded;
            }
        }

        StoredFile::create([
            'title_lv' => $request->input('title_lv'),
            'title_en' => $request->input('title_en'),
            'path' => $filePath,
            'mime_type' => $uploaded->getClientMimeType(),
            'size' => $uploaded->getSize(),
            'tags' => $tags,
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully!');
    }

    // Show all files (single, cleaned implementation)
    public function show()
    {
        $files = StoredFile::all()->map(function ($file) {
            $path = $file->path;

            $file->mime_type = $path && Storage::disk('public')->exists($path)
                ? Storage::disk('public')->mimeType($path)
                : ($file->mime_type ?? 'Unknown');

            $file->size = $path && Storage::disk('public')->exists($path)
                ? Storage::disk('public')->size($path)
                : ($file->size ?? 0);

            return $file;
        });

        return Inertia::render('Admin/Fails/showFiles', [
            'files' => $files,
        ]);
    }

    // Edit metadata form
    public function edit($id)
    {
        $file = StoredFile::findOrFail($id);
        return Inertia::render('Admin/Fails/editFile', [
            'file' => $file
        ]);
    }

    // Update metadata and optionally replace file
    public function update(Request $request, $id)
    {
        $fileRecord = StoredFile::findOrFail($id);

        $data = $request->validate([
            'title_lv' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'file' => 'nullable|file|max:10240|mimes:csv,txt,pdf,jpg,jpeg,png,zip,xlsx,xls,doc,docx',
            'tags' => 'nullable',
            'tags.*.lv' => 'nullable|string|max:255',
            'tags.*.en' => 'nullable|string|max:255',
        ]);

        $tags = null;
        if ($request->has('tags')) {
            $incoming = $request->input('tags');
            if (is_array($incoming)) {
                $tags = $incoming;
            } elseif (is_string($incoming)) {
                $decoded = json_decode($incoming, true);
                if (is_array($decoded)) $tags = $decoded;
            }
        }

        if ($request->file('file')) {
            $newFile = $request->file('file');

            if ($fileRecord->path && Storage::disk('public')->exists($fileRecord->path)) {
                Storage::disk('public')->delete($fileRecord->path);
            }

            $filePath = $newFile->store('files', 'public');

            $fileRecord->update([
                'title_lv' => $data['title_lv'] ?? $fileRecord->title_lv,
                'title_en' => $data['title_en'] ?? $fileRecord->title_en,
                'path' => $filePath,
                'mime_type' => $newFile->getClientMimeType(),
                'size' => $newFile->getSize(),
                'tags' => $tags,
            ]);
        } else {
            $fileRecord->update([
                'title_lv' => $data['title_lv'] ?? $fileRecord->title_lv,
                'title_en' => $data['title_en'] ?? $fileRecord->title_en,
                'tags' => $tags,
            ]);
        }

        return back()->with('success', 'File updated successfully');
    }

    // Delete file & DB record
    public function destroy($id)
    {
        $file = StoredFile::findOrFail($id);

        if ($file->path && Storage::disk('public')->exists($file->path)) {
            try {
                Storage::disk('public')->delete($file->path);
            } catch (\Throwable $e) {
                \Log::warning("Failed to delete stored file '{$file->path}': " . $e->getMessage());
            }
        }

        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully');
    }

    // Download file to user (inside the class, where it belongs)
    public function download($id)
    {
        $file = StoredFile::findOrFail($id);

        $path = $file->path;

        if (! $path || ! Storage::disk('public')->exists($path)) {
            return redirect()->back()->with('error', 'File not found on disk.');
        }

        $originalName = pathinfo($path, PATHINFO_BASENAME);
        $ext = pathinfo($path, PATHINFO_EXTENSION);

        if (!empty($file->title_en)) {
            $downloadName = Str::slug($file->title_en) . ($ext ? '.' . $ext : '');
        } elseif (!empty($file->title_lv)) {
            $downloadName = Str::slug($file->title_lv) . ($ext ? '.' . $ext : '');
        } else {
            $downloadName = $originalName;
        }

        return Storage::disk('public')->download($path, $downloadName);
    }
}

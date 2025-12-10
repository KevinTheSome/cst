<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoredFileController extends Controller
{
    public function create()
    {
        return inertia('Admin/Fails/uploadFile');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title_lv' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'file' => 'required|file|max:10240|mimes:csv,txt,pdf,jpg,jpeg,png,zip,xlsx,xls,doc,docx',
        ]);

        $file = $request->file('file');

       
        $filePath = $file->store('files', 'public');

       
        StoredFile::create([
            'title_lv' => $request->title_lv,
            'title_en' => $request->title_en,
            'path' => $filePath,                    
            'mime_type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

        return redirect()->back()->with('success', 'File uploaded successfully!');
    }
    public function show(){
        $files = StoredFile::all();
        return Inertia::render('Admin/Fails/showFiles', [
            'files' => $files
        ]);

    }
    public function edit($id)
    {
        $file = StoredFile::FindOrFail($id);
        return Inertia::render('Admin/Fails/editFile', [
            'file' => $file
        ]);
    }
    
    public function update(Request $request, $id)
    {
        $fileRecord = StoredFile::findOrFail($id);

        $data = $request->validate([
            'title_lv' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'file' => 'nullable|file|max:10240|mimes:csv,txt,pdf,jpg,jpeg,png,zip,xlsx,xls,doc,docx',
        ]);

        if ($request->file('file')) {
            $newFile = $request->file('file');

            if ($fileRecord->path && Storage::disk('public')->exists($fileRecord->path)) {
                Storage::disk('public')->delete($fileRecord->path);
            }

            $filePath = $newFile->store('files', 'public');

            $fileRecord->update([
                'title_lv' => $data['title_lv'],
                'title_en' => $data['title_en'],
                'path' => $filePath,
                'mime_type' => $newFile->getClientMimeType(),
                'size' => $newFile->getSize(),
            ]);
        } else {
            $fileRecord->update([
                'title_lv' => $data['title_lv'],
                'title_en' => $data['title_en'],
            ]);
        }

        return back()->with('success', 'File updated successfully');
    }

    public function destroy($id)
    {
        $file = StoredFile::findOrFail($id);

        // Delete the physical file if present
        if ($file->path && Storage::disk('public')->exists($file->path)) {
            try {
                Storage::disk('public')->delete($file->path);
            } catch (\Throwable $e) {
                // Log and continue — we don't want a storage error to block the DB delete
                \Log::warning("Failed to delete stored file '{$file->path}': " . $e->getMessage());
            }
        }

        // Delete the DB record
        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully');
    }
}
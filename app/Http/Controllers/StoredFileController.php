<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StoredFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

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
}
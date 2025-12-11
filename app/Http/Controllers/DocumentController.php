<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * User-facing database view
     */
    public function index()
    {
        // TODO: replace this static data with real data from the database
        $documents = [
            [
                'id'          => 1,
                'title_lv'    => 'ATMP fails LV',
                'title_en'    => 'ATMP document EN',
                'file_size'   => 345678, // bytes
                'mime_type'   => 'application/pdf',
                'created_at'  => now()->toIso8601String(),
                'download_url'=> route('documents.download', ['document' => 1]),
                'tags'        => [
                    ['id' => 1, 'name' => 'ATMP'],
                    ['id' => 2, 'name' => 'Ražotnes'],
                ],
            ],
            [
                'id'          => 2,
                'title_lv'    => 'Pacientu informācija',
                'title_en'    => 'Patient information',
                'file_size'   => 123456,
                'mime_type'   => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'created_at'  => now()->subDays(3)->toIso8601String(),
                'download_url'=> route('documents.download', ['document' => 2]),
                'tags'        => [
                    ['id' => 3, 'name' => 'Pacienti'],
                ],
            ],
        ];

        return Inertia::render('Database/index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Download handler – stub for now
     */
    public function download($documentId)
    {
        // Later you can implement real file downloads here.
        // For now just show 404 so the route exists.
        abort(404, 'Download not implemented yet.');
    }
}

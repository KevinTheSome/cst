<?php

namespace App\Services\Ai;

use Illuminate\Support\Facades\Storage;

class KnowledgeBaseService
{
    public function getContext(): string
    {
        $files = Storage::files('knowledge');

        $content = [];

        foreach ($files as $file) {
            $content[] = Storage::get($file);
        }

        return implode("\n\n", $content);
    }
}

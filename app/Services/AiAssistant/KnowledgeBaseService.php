<?php

namespace App\Services\AiAssistant;

use Illuminate\Support\Facades\Storage;

class KnowledgeBaseService
{
    public function getAllKnowledge(): string
    {
        $files = Storage::disk('local')->files('knowledge');

        $content = '';

        foreach ($files as $file) {
            $content .= Storage::disk('local')->get($file) . "\n\n";
        }

        return $content;
    }
}

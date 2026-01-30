<?php

namespace App\Http\Controllers\Ai;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Ai\KnowledgeBaseService;
use App\Services\Ai\HuggingFaceClient;

class AiChatController extends Controller
{
    public function chat(
        Request $request,
        KnowledgeBaseService $knowledge,
        HuggingFaceClient $hf
    ) {
        try {
            $message = $request->input('message');

            logger()->info('AI CHAT HIT', [
                'message' => $message,
            ]);

            $context = $knowledge->getContext();

            $prompt = "Answer using the knowledge below.\n\n$context\n\nUser: $message\nAssistant:";

            $reply = $hf->chat($prompt);

            return response()->json(['reply' => $reply]);
        } catch (\Throwable $e) {
            logger()->error('AI CHAT ERROR', [
                'exception' => $e,
            ]);

            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

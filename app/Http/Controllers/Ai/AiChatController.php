<?php

namespace App\Http\Controllers\Ai;

use App\Http\Controllers\Controller;
use App\Services\AiAssistant\KnowledgeBaseService;
use Illuminate\Http\Request;

class AiChatController extends Controller
{
    public function chat(Request $request, KnowledgeBaseService $knowledge)
    {
        $userMessage = $request->input('message');
        $kb = $knowledge->getAllKnowledge();

        // Placeholder response (AI integration comes later)
        $reply = "You asked: \"$userMessage\"\n\nKnowledge loaded:\n" . substr($kb, 0, 500) . '...';

        return response()->json([
            'reply' => $reply,
        ]);
    }
}

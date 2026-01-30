<?php

namespace App\Services\Ai;

use Illuminate\Support\Facades\Http;

class HuggingFaceClient
{
    protected string $model;
    protected string $apiKey;

    public function __construct()
    {
        $this->model = config('services.huggingface.chat_model');
        $this->apiKey = config('services.huggingface.key');
    }

    public function chat(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type'  => 'application/json',
        ])->post(
            'https://router.huggingface.co/v1/chat/completions',
            [
                'model' => $this->model,
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt,
                    ],
                ],
                'temperature' => config('services.huggingface.temperature', 0.7),
                'max_tokens' => config('services.huggingface.max_tokens', 512),
            ]
        );

        if ($response->failed()) {
            throw new \Exception($response->body());
        }

        return $response->json('choices.0.message.content') ?? '';
    }
}

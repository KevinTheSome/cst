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
        logger()->info('HF MODEL USED', [
            'model' => $this->model,
            'key_present' => !empty($this->apiKey),
        ]);

        $response = Http::withToken($this->apiKey)
            ->post('https://router.huggingface.co/v1/chat/completions', [
                'model' => $this->model,
                'messages' => [
                    ['role' => 'user', 'content' => $prompt],
                ],
                'temperature' => (float) config('services.huggingface.temperature', 0.7),
                'max_tokens'  => (int) config('services.huggingface.max_tokens', 512),
            ]);

        if ($response->failed()) {
            throw new \Exception($response->body());
        }

        return $response->json('choices.0.message.content') ?? '';
    }
}


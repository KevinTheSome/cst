<?php

return [
    'huggingface' => [
        'api_key' => env('HUGGINGFACE_API_KEY'),
        'chat_model' => env('HUGGINGFACE_CHAT_MODEL', 'microsoft/Phi-3-mini-4k-instruct'),
        'embedding_model' => env('HUGGINGFACE_EMBEDDING_MODEL', 'sentence-transformers/all-MiniLM-L6-v2'),
        'timeout' => env('HUGGINGFACE_TIMEOUT', 60),
        'max_tokens' => env('HUGGINGFACE_MAX_TOKENS', 1024),
        'temperature' => env('HUGGINGFACE_TEMPERATURE', 0.7),
    ],
];

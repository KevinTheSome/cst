<?php

return [
    // Map ISO country codes (UPPERCASE) to site locale codes
    'map' => [
        'EN' => 'en',
        'EE' => 'et',
        'LT' => 'lt',
        'NO' => 'no',
    ],

    // Default locale and default fallback country
    'default_locale' => 'lv',
    'default_country' => env('DEFAULT_COUNTRY', 'LV'),

    'blocked_countries' => ['RU', 'CN', 'US'], // test with these
];

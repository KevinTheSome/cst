<?php

if (!function_exists('findPageComponent')) {
    function findPageComponent(string $country): string
    {
        return match ($country) {
            'LV' => 'welcome',
            default => 'welcome',
        };
    }
}

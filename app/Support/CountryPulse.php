<?php

namespace App\Support;

use App\Models\CountryPulseMetric;

class CountryPulse
{
    public static function record(string $metric, ?string $countryCode = null, int $value = 1): void
    {
        CountryPulseMetric::create([
            'metric' => $metric,
            'country_code' => $countryCode,
            'value' => $value,
            'occurred_at' => now(),
        ]);
    }
}

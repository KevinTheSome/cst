<?php

namespace App\Support;

use App\Models\CountryPulseMetric;

class CountryPulse
{
    public static function record(
        string $metric,
        ?string $countryCode = null,
        int $value = 1,
        ?string $label = null
    ): void {
        CountryPulseMetric::create([
            'metric' => $metric,
            'label' => $label,
            'country_code' => $countryCode,
            'value' => $value,
            'occurred_at' => now(),
        ]);
    }
}

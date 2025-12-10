<?php

namespace App\Support;

class CountryContext
{
    public static function code(): ?string
    {
        return request()->attributes->get('country_code');
    }
}

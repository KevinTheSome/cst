<?php

return [
    'likumi' => [

        'meta' => [
            'title' => 'Laws and Regulations',
        ],

        'badge' => 'Legal framework',

        'hero' => [
            'title' => 'Legal framework for medical specialists',
            'text' => 'European Union and Latvian legal acts that regulate medical practice, patient rights, and data protection.',
        ],

        'eu' => [
            'title' => 'European Union regulations',

            1 => [
                'title' => 'Regulation (EU) 2017/745',
                'text' => 'Medical Device Regulation (MDR) governing the safety and performance of medical devices.',
            ],

            2 => [
                'title' => 'Regulation (EU) 2017/746',
                'text' => 'In vitro diagnostic medical devices regulation (IVDR).',
            ],

            3 => [
                'title' => 'GDPR',
                'text' => 'General Data Protection Regulation ensuring protection of personal data.',
            ],

            4 => [
                'title' => 'Clinical Trials Regulation',
                'text' => 'Rules for conducting clinical trials on medicinal products in the European Union.',
            ],

            5 => [
                'title' => 'Pharmacovigilance',
                'text' => 'System for monitoring, assessing, and preventing adverse effects of medicines.',
            ],
        ],

        'lv' => [
            'title' => 'Latvian legislation',

            1 => [
                'title' => 'Medical Treatment Law',
                'text' => 'Regulates healthcare provision, professional qualifications, and patient safety in Latvia.',
            ],

            2 => [
                'title' => 'Patient Rights Law',
                'text' => 'Defines patient rights, informed consent, and access to medical information.',
            ],

            3 => [
                'title' => 'Personal Data Processing Law',
                'text' => 'National law governing personal data processing in accordance with GDPR.',
            ],

            4 => [
                'title' => 'Cabinet of Ministers Regulations',
                'text' => 'Specific procedures and requirements issued by the Cabinet of Ministers of Latvia.',
            ],
        ],
    ],

    'atmp' => [
        'meta' => [
            'title' => 'ATMP Production Facilities in Europe',
        ],

        'badge' => 'ATMP • Europe',

        'hero' => [
            'title' => 'ATMP Production Facilities in Europe',
            'title1' => 'ATMP',
            'title2' => 'Production Facilities in Europe',
            'text' => 'An overview of Europe’s leading Advanced Therapy Medicinal Products (ATMP) manufacturing facilities and their role in regenerative medicine.',
        ],

        'overview' => [
            'title' => 'European ATMP manufacturing overview',
            'text' => 'Europe is a global leader in ATMP manufacturing, with over 50 GMP-certified facilities across 15 countries. These facilities provide critical therapies for patients with rare diseases and oncology indications.',
        ],

        'stats' => [
            'facilities' => 'GMP facilities',
            'countries' => 'European countries',
            'patients' => 'Patients per year',
        ],

        'facilities' => [
            'title' => 'Leading Facilities',
            'text' => 'Select a facility to view detailed information about its operations.',
            'f1' => [
                'name' => 'Milan Biotechnology Center',
                'country' => 'Italy',
                'type' => 'GMP Production',
                'capacity' => '500+ patients/year',
                'established' => '2018',
                'description' => 'One of the largest ATMP facilities in Europe...',
            ],
            'f2' => [
                'name' => 'Berlin Medical Technology Park',
                'country' => 'Germany',
                'type' => 'Clinical Production',
                'capacity' => '300+ patients/year',
                'established' => '2016',
                'description' => 'Leading center for gene therapy and CAR-T cell development.',
            ],
            'f3' => [
                'name' => 'Paris Regenerative Medicine Institute',
                'country' => 'France',
                'type' => 'Research & Production',
                'capacity' => '200+ patients/year',
                'established' => '2019',
                'description' => 'Innovative solutions for iPSC and MSC cell therapies.',
            ],
            'f4' => [
                'name' => 'London Biovessel Facility',
                'country' => 'UK',
                'type' => 'Commercial Production',
                'capacity' => '400+ patients/year',
                'established' => '2017',
                'description' => 'Specializes in autoimmune disease treatments using ATMP.',
            ],

        ],

        'details' => [
            'country' => 'Country',
            'type' => 'Type',
            'capacity' => 'Capacity',
            'established' => 'Established',
            'close' => 'Close',
        ],

        'regulatory' => [
            'title' => 'Regulatory framework',
            'text' => 'ATMP manufacturing in Europe is governed by strict regulations to ensure patient safety and product quality.',

            'ema' => [
                'title' => 'EMA Regulation',
                'text' => 'The European Medicines Agency (EMA) is responsible for centralized ATMP approval across the European Union.',
            ],

            'gmp' => [
                'title' => 'GMP Certification',
                'text' => 'All manufacturing facilities must comply with Good Manufacturing Practice (GMP) standards.',
            ],

            'national' => [
                'title' => 'National regulators',
                'text' => 'Each country has its own national authorities responsible for ATMP oversight.',
            ],
        ],

        'footer' => 'Information about ATMP production facilities is provided for educational purposes and may change. Contact local regulators for the latest updates.',
    ],

    'apmaciba' => [
        'meta' => [
            'title' => 'Online Training',
        ],

        'hero' => [
            'title' => 'Training Program for Doctors and Other Healthcare Specialists',
            'text' => 'Advanced Therapy Medicinal Products (ATMP), including mesenchymal stromal cell (MSC) therapies in exceptional cases.',
        ],

        'form' => [
            'placeholder' => 'Lesson name',
            'submit' => 'Unlock',
            'error_invalid' => 'Please enter a valid code.',
        ],

        'filters' => [
            'search_title' => [
                'label' => 'Search by title',
            ],
            'teacher' => [
                'label' => 'Teacher',
            ],
            'min_rating' => [
                'label' => 'Star rating',
            ],
            'all' => 'All',
            'results' => 'results',
            'clear' => 'Clear filters',
        ],

        'lock' => [
            'title' => 'No training is currently available',
            'subtitle' => 'Please check back later.',
        ],

        'rating' => [
            'submit' => 'Submit Rating',
            'saved' => 'Rating saved.',
            'saving' => 'Saving...',
            'rated' => 'Rated',
            'review' => 'Review',
            'show' => 'Rate',
            'hide' => 'Hide rating',
        ],
        'status' => [
            'locked' => 'Locked',
            'unlocked' => 'Unlocked',
        ],
        'actions' => [
            'unlock' => 'Unlock',
            'play' => 'Play',
            'rate' => 'Rate this training',
        ],
        'unlock' => [
            'success' => 'Training unlocked successfully.',
        ],
    ],
];

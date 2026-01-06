<?php

return [
    'meta' => [
        'page_title' => 'Clinical Trials',
    ],

    'hero' => [
        'badge' => 'Evidence-Based Medicine',
        'title_line_1' => 'Clinical Trials and',
        'title_line_2' => 'Data Analysis',
        'description' => 'Structured information on MSC therapy in the treatment of psoriasis and Crohn’s disease: mechanisms, clinical outcomes, and safety.',
    ],

    'conditions' => [
        'psoriasis' => [
            'name' => 'Psoriasis',
            'summary' => 'Studies on MSC therapy have shown reduced inflammation, normalization of T-cell activity, and a decrease in skin lesions.',
            'points' => [
                'Clinical trials: 9+ international',
                'PASI reduction: up to 87% in 4 weeks',
                'Mechanism: IL-10, TGF-β, PGE2 secretion',
                'Safety: no significant adverse effects (meta-analysis, 42 RCTs)',
            ],
        ],

        'crohns' => [
            'name' => 'Crohn’s disease',
            'summary' => 'MSC therapy in patients with inflammatory bowel disease demonstrates the ability to reduce tissue damage and normalize immune responses.',
            'points' => [
                'Clinical trials: 12+ in Europe and the USA',
                'Fistula healing rates: up to 50%',
                'Stable remission duration: up to 12 months',
                'Mechanism: tissue regeneration + immunomodulation',
            ],
        ],
    ],

    'challenges' => [
        'title' => 'Challenges and Future Directions',
        'summary' => 'MSC therapy is promising, but requires standardization, larger studies, and compliance with regulatory requirements.',
        'points' => [
            'Standardization: source (UC/adipose/bone marrow), dosage, administration route',
            'Larger RCTs and long-term safety data are required',
            'ATMP regulation: quality control and reproducibility',
            'Trend: MSC-Exo, genetically modified MSCs',
            'Potential: combination with biologics, autoimmune diseases (RA, SLE, MS)',
        ],
    ],
];

<?php

return [
    'page_title' => 'Anketa',
    'form_title' => 'Anketa pacientiem',

    'back_home' => 'Uz sākumlapu',
    'portal_chip' => 'Pacientu Portāls',
    'heading' => 'Veselības Anketa',

    'progress' => [
        'step' => 'Solis',
    ],

    'steps' => [
        'demographics' => [
            'title' => 'Demogrāfiskie dati',
            'desc' => 'Pamatinformācija interpretācijai.',
        ],
        'health' => [
            'title' => 'Veselības profils',
            'desc' => 'Atzīmējiet diagnosticētās slimības.',
        ],
        'therapy' => [
            'title' => 'Terapijas statuss',
            'desc' => 'Informācija par slimības gaitu un iepriekšējo ārstēšanu.',
        ],
    ],

    'fields' => [
        'gender' => 'Dzimums',
        'age' => 'Vecums',
        'country' => 'Valsts',
        'diseases' => 'Slimību vēsture',
        'other_disease' => 'Citas slimības apraksts',
        'severity' => 'Smaguma pakāpe',
        'therapy' => 'Vai iepriekš saņemta cilmes šūnu terapija?',
    ],

    'placeholders' => [
        'country' => 'Izvēlieties valsti...',
        'country_other' => 'Ierakstiet valsts nosaukumu',
        'other_disease' => 'Lūdzu precizējiet...',
    ],

    'options' => [
        'gender' => [
            'male' => 'Vīrietis',
            'female' => 'Sieviete',
        ],
        'age' => [
            '0_18' => '0–18',
            '19_35' => '19–35',
            '36_50' => '36–50',
            '51_plus' => '51+',
        ],
        'country' => [
            'lv' => 'Latvija',
            'lt' => 'Lietuva',
            'ee' => 'Igaunija',
            'fi' => 'Somija',
            'se' => 'Zviedrija',
            'no' => 'Norvēģija',
            'de' => 'Vācija',
            'pl' => 'Polija',
            'other' => 'Cita',
        ],
        'diseases' => [
            'blood' => 'Asins slimības (piem., leikēmija)',
            'autoimmune' => 'Autoimūnas slimības',
            'neuro' => 'Neiroloģiskas slimības',
            'diabetes' => 'Diabēts',
            'heart' => 'Sirds slimības',
            'other' => 'Cita',
        ],
        'severity' => [
            'mild' => 'Viegls',
            'medium' => 'Vidējs',
            'severe' => 'Smags',
        ],
        'therapy' => [
            'yes' => 'Jā',
            'no' => 'Nē',
        ],
    ],

    'actions' => [
        'back' => 'Atpakaļ',
        'next' => 'Turpināt',
        'submit' => 'Iesniegt datus',
    ],

    'finish' => [
        'title' => 'Paldies!',
        'message' => "Jūsu atbildes ir veiksmīgi saglabātas.\nMēs ar jums sazināsimies tuvākajā laikā.",
        'restart' => 'Atgriezties sākumā',
    ],

    'errors' => [
        'required' => 'Lūdzu aizpildiet obligātos laukus.',
        'required_all' => 'Lūdzu aizpildiet visus obligātos laukus.',
        'gender' => 'Lūdzu izvēlieties dzimumu.',
        'age' => 'Lūdzu izvēlieties vecuma grupu.',
        'country' => 'Lūdzu izvēlieties valsti.',
        'country_other' => 'Lūdzu ievadiet valsts nosaukumu.',
        'diseases' => 'Lūdzu atzīmējiet vismaz vienu slimību.',
        'other_disease' => 'Lūdzu precizējiet citu slimību.',
        'severity' => 'Lūdzu izvēlieties smaguma pakāpi.',
        'therapy' => 'Lūdzu izvēlieties atbildi.',
        'submit_error' => 'Neizdevās iesniegt datus. Lūdzu mēģiniet vēlreiz.',
        'unknown_error' => 'Kaut kas nogāja greizi. Lūdzu mēģiniet vēlreiz.',
        'connection_error' => 'Savienojuma kļūda. Lūdzu mēģiniet vēlreiz.',
    ],
];

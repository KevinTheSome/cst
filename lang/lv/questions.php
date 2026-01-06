<?php

return [
    'meta' => [
        'title' => 'Anketa',
    ],

    'portal' => [
        'badge' => 'Drošais Pacientu Portāls',
        'title' => 'Anketa Pacientiem',
        'subtitle' => 'Ievadiet unikālo piekļuves kodu, lai ielādētu anketas jautājumus.',
    ],

    'code' => [
        'title' => 'Ievadiet 12 zīmju kodu',
        'unlock' => 'Atbloķēt',
        'verifying' => 'Pārbauda...',
        'reset' => 'Notīrīt',
        'errors' => [
            'length' => 'Kods satur 12 simbolus.',
            'invalid' => 'Kods nav derīgs.',
            'no_form' => 'Šim kodam nav piesaistīta anketa.',
            'server' => 'Servera kļūda. Mēģiniet vēlāk.',
        ],
    ],

    'highlights' => [
        [
            'title' => 'Soli pa solim',
            'accent' => 'Dinamiski jautājumi',
            'description' => 'Jautājumi tiek ielādēti no anketas, kas piesaistīta jūsu kodam.',
        ],
        [
            'title' => 'Datu drošība',
            'accent' => 'Šifrēta sūtīšana',
            'description' => 'Jūsu sensitīvie dati tiek apstrādāti droši un konfidenciāli.',
        ],
        [
            'title' => 'Atbalsts',
            'accent' => 'Rūpes par pacientu',
            'description' => 'Mūsu komanda palīdz interpretēt atbildes un sniedz ieteikumus.',
        ],
    ],

    'consent' => [
        'title' => 'Datu apstrādes piekrišana',
        'description' => 'Anketa apkopo sensitīvu veselības informāciju, lai sagatavotu personalizētu terapijas piedāvājumu.',
        'accept' => 'Piekrītu',
        'decline' => 'Nepiekrītu',
    ],

    'declined' => [
        'title' => 'Piekļuve liegta',
        'description' => 'Jūs atteicāties no datu apstrādes. Anketa netika ielādēta.',
        'restart' => 'Sākt no jauna',
    ],

    'form' => [
        'exit' => 'Iziet',
        'question_counter' => 'Jautājums :current no :total',
        'placeholder_text' => 'Rakstiet atbildi šeit...',
        'select_placeholder' => 'Izvēlieties...',
    ],

    'navigation' => [
        'back' => 'Atpakaļ',
        'next' => 'Tālāk',
        'submit' => 'Iesniegt',
    ],

    'submit' => [
        'error' => 'Kļūda saglabājot atbildes.',
        'success_title' => 'Paldies!',
        'success_text' => 'Jūsu atbildes ir veiksmīgi saglabātas drošajā datu bāzē.',
        'restart' => 'Atgriezties sākumā',
    ],
];

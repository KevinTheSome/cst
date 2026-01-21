<?php

return [
    'title' => 'Admin Panel',
    'brand' => 'Admin OS',
    'version' => 'Version 2.0',

    'sections' => [
        'command' => 'Command',
        'content' => 'Content',
        'education' => 'Education',
        'system' => 'System',
        'files' => 'Files',
    ],

    'nav' => [
        'dashboard' => ['label' => 'Control room', 'description' => 'Live signals'],
        'all_forms' => ['label' => 'All forms', 'description' => 'Forms management'],
        'anketa_results' => ['label' => 'Form submissions', 'description' => 'Submissions'],
        'form_codes' => ['label' => 'Form codes', 'description' => 'Access generation'],
        'form_selector' => ['label' => 'Form selector', 'description' => 'Type config'],

        'lecture_codes' => ['label' => 'Lecture codes', 'description' => 'Access control'],
        'trainings' => ['label' => 'Trainings', 'description' => 'Courses list'],
        'training_create' => ['label' => 'New training', 'description' => 'Add course'],

        'security' => ['label' => 'Admin users', 'description' => 'Roles & Audit'],
        'files' => ['label' => 'Manage files', 'description' => 'Upload and manage stored files'],
    ],

    'badges' => [
        'live' => 'Live',
        'new' => 'New',
        'add' => 'Add',
    ],

    'pulse' => [
        'title' => 'Pulse Dashboard',
        'subtitle' => 'Realtime analytics view',
    ],

    'status' => [
        'online' => 'Online',
    ],

    'lang' => [
        'lv' => 'LAT',
        'en' => 'ENG',
    ],

    'actions' => [
        'sign_out' => 'Sign out',
    ],

    'a11y' => [
        'toggle_menu' => 'Open menu',
    ],
        'trainings' => [
        'index' => [
            'subtitle' => 'View / edit / delete trainings.',
            'empty' => 'No trainings found.',
            'empty_hint' => 'Click “Create” to add your first training.',
        ],
    ],

];

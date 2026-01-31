<?php

return [
    'page_title' => 'Questionnaire',
    'form_title' => 'Patient questionnaire',

    'back_home' => 'Back to home',
    'portal_chip' => 'Patient Portal',
    'heading' => 'Health Questionnaire',

    'progress' => [
        'step' => 'Step',
    ],

    'steps' => [
        'demographics' => [
            'title' => 'Demographic details',
            'desc'  => 'Basic info for interpretation.',
        ],
        'health' => [
            'title' => 'Health profile',
            'desc'  => 'Select diagnosed conditions.',
        ],
        'therapy' => [
            'title' => 'Therapy status',
            'desc'  => 'Information about disease course and previous treatment.',
        ],
    ],

    'fields' => [
        'gender' => 'Gender',
        'age' => 'Age',
        'country' => 'Country',
        'diseases' => 'Medical history',
        'other_disease' => 'Other disease description',
        'severity' => 'Severity',
        'therapy' => 'Have you previously received stem cell therapy?',
    ],

    'placeholders' => [
        'country' => 'Select a country...',
        'country_other' => 'Enter country name',
        'other_disease' => 'Please specify...',
    ],

    'options' => [
        'gender' => [
            'male' => 'Male',
            'female' => 'Female',
        ],
        'age' => [
            '0_18' => '0–18',
            '19_35' => '19–35',
            '36_50' => '36–50',
            '51_plus' => '51+',
        ],
        'country' => [
            'lv' => 'Latvia',
            'lt' => 'Lithuania',
            'ee' => 'Estonia',
            'fi' => 'Finland',
            'se' => 'Sweden',
            'no' => 'Norway',
            'de' => 'Germany',
            'pl' => 'Poland',
            'other' => 'Other',
        ],
        'diseases' => [
            'blood' => 'Blood diseases (e.g., leukemia)',
            'autoimmune' => 'Autoimmune diseases',
            'neuro' => 'Neurological diseases',
            'diabetes' => 'Diabetes',
            'heart' => 'Heart disease',
            'other' => 'Other',
        ],

        // ✅ FIX: TSX uses pacientu_anketa.options.severity.moderate
        'severity' => [
            'mild' => 'Mild',
            'moderate' => 'Moderate', // was "medium"
            'severe' => 'Severe',
        ],

        'therapy' => [
            'yes' => 'Yes',
            'no' => 'No',
        ],
    ],

    'actions' => [
        'back' => 'Back',
        'next' => 'Continue',
        'submit' => 'Submit',
    ],

    'finish' => [
        'title' => 'Thank you!',
        'message' => 'Your answers have been saved successfully. We will contact you soon.',
        'restart' => 'Start over',
    ],

    'errors' => [
        'gender' => 'Please select gender.',
        'age' => 'Please select age group.',
        'country' => 'Please select a country.',
        'country_other' => 'Please enter the country name.',
        'diseases' => 'Please select at least one condition.',
        'other_disease' => 'Please specify the other condition.',
        'severity' => 'Please select severity.',
        'therapy' => 'Please select yes or no.',
        'required' => 'Please fill all required fields.',
        'required_all' => 'Please fill all required fields to continue.',
        'submit_error' => 'Failed to submit. Please try again.',
        'unknown_error' => 'Unknown error.',
        'connection_error' => 'Connection error. Please try again.',
    ],
];

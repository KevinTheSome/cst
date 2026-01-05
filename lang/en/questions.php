<?php

return [
    'meta' => [
        'title' => 'Questionnaire',
    ],

    'portal' => [
        'badge' => 'Secure Patient Portal',
        'title' => 'Patient Questionnaire',
        'subtitle' => 'Enter your unique access code to load the questionnaire.',
    ],

    'code' => [
        'title' => 'Enter the 12-character code',
        'unlock' => 'Unlock',
        'verifying' => 'Verifying...',
        'reset' => 'Clear',

        'errors' => [
            'length' => 'The code must contain 12 characters.',
            'invalid' => 'The code is invalid.',
            'no_form' => 'No questionnaire is associated with this code.',
            'server' => 'Server error. Please try again later.',
        ],
    ],

    'highlights' => [
        'steps' => [
            'title' => 'Step by step',
            'accent' => 'Dynamic questions',
            'description' => 'Questions are loaded from the questionnaire linked to your code.',
        ],
        'security' => [
            'title' => 'Data security',
            'accent' => 'Encrypted transfer',
            'description' => 'Your sensitive data is processed securely and confidentially.',
        ],
        'support' => [
            'title' => 'Support',
            'accent' => 'Patient care',
            'description' => 'Our team helps interpret responses and provides recommendations.',
        ],
    ],

    'consent' => [
        'title' => 'Data processing consent',
        'description' =>
            'The questionnaire collects sensitive health information to prepare a personalized therapy proposal.',
        'accept' => 'I agree',
        'decline' => 'I do not agree',
    ],

    'declined' => [
        'title' => 'Access denied',
        'description' => 'You declined data processing. The questionnaire was not loaded.',
        'restart' => 'Start over',
    ],

    'form' => [
        'exit' => 'Exit',
        'question_counter' => 'Question :current of :total',
        'placeholder_text' => 'Write your answer here...',
        'select_placeholder' => 'Select...',
    ],

    'navigation' => [
        'back' => 'Back',
        'next' => 'Next',
        'submit' => 'Submit',
    ],

    'submit' => [
        'error' => 'Error saving answers.',
        'success_title' => 'Thank you!',
        'success_text' => 'Your answers have been securely saved.',
        'restart' => 'Return to start',
    ],
];

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
        'title' => 'Enter 12-character code',
        'unlock' => 'Unlock',
        'verifying' => 'Verifying...',
        'reset' => 'Reset',
        'errors' => [
            'length' => 'Code must be 12 characters.',
            'invalid' => 'Code is not valid.',
            'no_form' => 'No questionnaire is associated with this code.',
            'server' => 'Server error. Please try again later.',
        ],
    ],

    'highlights' => [
        [
            'title' => 'Step by step',
            'accent' => 'Dynamic questions',
            'description' => 'Questions are loaded from the questionnaire linked to your code.',
        ],
        [
            'title' => 'Data security',
            'accent' => 'Encrypted submission',
            'description' => 'Your sensitive data is handled securely and confidentially.',
        ],
        [
            'title' => 'Support',
            'accent' => 'Patient care',
            'description' => 'Our team helps interpret answers and provides recommendations.',
        ],
    ],

    'consent' => [
        'title' => 'Data processing consent',
        'description' => 'The questionnaire collects sensitive health information to provide a personalized therapy plan.',
        'accept' => 'Accept',
        'decline' => 'Decline',
    ],

    'declined' => [
        'title' => 'Access denied',
        'description' => 'You declined data processing. The questionnaire was not loaded.',
        'restart' => 'Start over',
    ],

    'form' => [
        'exit' => 'Exit',
        'question_counter' => 'Question :current of :total',
        'placeholder_text' => 'Type your answer here...',
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
        'success_text' => 'Your answers have been successfully saved in the secure database.',
        'restart' => 'Return to start',
    ],
];

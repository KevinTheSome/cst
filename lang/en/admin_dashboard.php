<?php

return [

    'head' => [
        'title' => 'Control room',
    ],

    'header' => [
        'welcome' => 'Welcome Back',
        'title' => 'Command Dashboard',
        'subtitle' => 'Live overview of missions, team requests, and system health status.',
        'systems_stable' => 'Systems Stable',
    ],

    'stats' => [
        'users' => [
            'label' => 'Active members',
            'trend' => 'vs last 7 days',
        ],
        'form_results' => [
            'label' => 'Form results',
            'trend' => 'Received responses',
        ],
        'delivery' => [
            'label' => 'On-time delivery',
            'trend' => 'quality index',
        ],
        'budget' => [
            'label' => 'Budget runway',
            'trend' => 'days saved',
        ],
    ],

    'activity' => [
        'title' => 'Realtime Activity',
        'view_log' => 'View Log',
        'items' => [
            [
                'title' => 'Adrians approved “Biochip spotlight”',
                'detail' => 'Moved to live queue • Marketing',
            ],
            [
                'title' => 'New partnership request',
                'detail' => 'Cēsis BioLabs • Needs response',
            ],
            [
                'title' => 'Security report exported',
                'detail' => 'Sent to leadership',
            ],
        ],
    ],

    'tasks' => [
        'title' => 'Execution Board',
        'open' => 'Open Board',
        'today' => 'Today',
        'next' => 'Next',
        'captions' => [
            'today' => 'High priority items',
            'next' => 'Up next in pipeline',
        ],
    ],

    'system' => [
        'title' => 'System Status',
        'api_latency' => 'API latency',
        'web_uptime' => 'Web uptime',
        'queue_depth' => 'Queue depth',
        'status' => [
            'good' => 'Good',
            'green' => 'Green',
            'stable' => 'Stable',
        ],
    ],

    'modal' => [
        'story' => [
            'title' => 'Launch Story',
            'description' => 'Draft a new highlight story for the dashboard feed.',
        ],
        'invite' => [
            'title' => 'Invite Member',
            'description' => 'Send an invitation link to a new team member.',
            'email' => 'Email Address',
        ],
        'update' => [
            'title' => 'Share Update',
            'description' => 'Broadcast a quick status update to the entire team.',
        ],
        'cancel' => 'Cancel',
        'create' => 'Create',
        'send_invite' => 'Send Invite',
    ],

];

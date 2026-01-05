<?php

return [
    'page_title' => 'Lecture codes',
    'layout_title' => 'Lecture codes',
    'heading' => 'Lecture access',
    'subheading' => 'Manage validation codes for online course access.',

    'create' => [
        'title' => 'Generate new code',
        'custom_code_label' => 'Custom code (optional)',
        'custom_code_placeholder' => 'Leave empty to auto-generate',
        'trainings_label' => 'Applicable trainings',
        'no_trainings' => 'No trainings available',
        'selected' => 'Selected',
        'max_uses_label' => 'Max uses',
        'max_uses_hint' => 'Set to 0 for unlimited uses.',
        'creating' => 'Creating...',
        'create_button' => 'Create access code',
    ],

    'table' => [
        'title' => 'Active codes',
        'records' => 'records',
        'th_code_date' => 'Code & date',
        'th_scope' => 'Access scope',
        'th_usage' => 'Usage',
        'th_status' => 'Status',
        'th_actions' => 'Actions',
    ],

    'status' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
    ],

    'actions' => [
        'edit' => 'Edit',
        'regenerate' => 'Regenerate',
        'delete' => 'Delete',
        'cancel' => 'Cancel',
        'ok' => 'Okay, got it',
        'processing' => 'Processing...',
        'confirm_delete' => 'Yes, delete',
        'confirm_regenerate' => 'Yes, regenerate',
    ],

    'empty' => [
        'title' => 'No codes found',
        'subtitle' => 'Create your first access code above.',
    ],

    'confirm' => [
        'delete_title' => 'Delete access code?',
        'regenerate_title' => 'Regenerate code?',
        'delete_text' => 'Are you sure you want to delete code ":code"? This action cannot be undone.',
        'regenerate_text' => 'This will replace code ":code" with a new random string. The old code will stop working immediately.',
    ],

    'edit' => [
        'title' => 'Edit access code',
        'code_label' => 'Code string',
        'trainings_label' => 'Assigned trainings',
        'no_trainings' => 'No trainings available',
        'max_uses_label' => 'Max uses',
        'saving' => 'Saving...',
        'save' => 'Save changes',
    ],

    'alerts' => [
        'success' => 'Success',
        'error' => 'Error',
        'created' => 'Code created successfully!',
        'updated' => 'Code updated successfully.',
        'deleted' => 'Access code deleted.',
        'regenerated' => 'Code regenerated successfully.',
        'action_failed' => 'Action failed. Please try again.',
    ],

    'errors' => [
        'max_uses_non_negative' => 'Max uses must be >= 0',
        'create_failed' => 'Failed to create code.',
        'update_failed' => 'Failed to update code.',
    ],

    'misc' => [
        'dash' => '—',
        'training' => 'Training',
        'all_trainings' => 'All trainings',
        'all_universal' => 'All (Universal access)',
    ],
];

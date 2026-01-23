<?php

return [
    'index' => [
        'page_title'      => 'Forms',
        'label'           => 'Forms',
        'heading'         => 'All forms',
        'subheading'      => 'Overview of all public and private forms.',
        'create_button'   => '+ Create new form',
        'list_label'      => 'Forms list',
        'list_subheading' => 'Click View to open a form, or Edit / Delete it.',
        'id_label'        => 'ID',
        'code_label'      => 'Code',

        'view'            => 'View',
        'edit'            => 'Edit',
        'delete'          => 'Delete',

        'empty'           => 'No forms yet.',
        'confirm_delete'  => 'Are you sure you want to delete the form "{title}"?',
        'deleted_success' => 'Form deleted successfully.',
        'deleted_error'   => 'Error deleting form.',

        'search_placeholder' => 'Search...',
        'na' => 'N/A',

        'delete_confirm' => 'Are you sure you want to delete this form?',

        'filters' => [
            'title' => 'Filters',
            'type' => 'Type',
            'any_type' => 'Any type',
            'public' => 'Public',
            'private' => 'Private',
            'code' => 'Code',
            'from' => 'From',
            'to' => 'To',
        ],

        'actions' => [
            'reset' => 'Reset',
            'filters' => 'Filters',
            'clear_filters' => 'Clear filters',
            'clear' => 'Clear',
            'apply' => 'Apply',
            'create_new_aria' => 'Create new',
        ],

        'misc' => [
            'untitled' => 'Untitled form',
        ],
    ],

    'results' => [
        'page_title' => 'Submissions',
        'layout_title' => 'Submissions',

        'label' => 'Submissions',
        'heading' => 'Submissions',
        'subheading' => 'Overview of submitted answers and their content.',

        'total_answers' => 'Total answers',
        'search_placeholder' => 'Search submissions...',

        'table' => [
            'id_code' => 'ID / CODE',
            'type' => 'TYPE',
            'submitted' => 'SUBMITTED',
            'answers' => 'ANSWERS',
            'action' => 'ACTION',
        ],

        'empty' => 'No submissions found.',
        'empty_hint' => 'Try adjusting your filters or search query.',

        'actions' => [
            'filters' => 'Filters',
            'view' => 'View',
            'reset' => 'Reset',
            'clear' => 'Clear',
            'apply' => 'Apply',
        ],

        'filters' => [
            'type' => 'Type',
            'code' => 'Code',
            'code_placeholder' => 'Code...',
            'date_range' => 'Submission date range',
            'from' => 'From',
            'to' => 'To',
            'sort' => 'Sort order',
            'newest' => 'Newest first',
            'oldest' => 'Oldest first',
        ],

        'view_title' => 'Submission',
        'view_layout_title' => 'Submission',
        'view_label' => 'Submission',
        'view_subheading' => 'Full answers from one questionnaire submission.',

        'field_id' => 'ID',
        'field_type' => 'Type',
        'field_code' => 'Code',
        'field_submitted' => 'Submitted',

        'answers_heading' => 'Answers',
        'answers_note' => 'Only administrators can view this information.',
        'answers_empty' => 'No answers stored.',

        'misc' => [
            'dash' => '—',
            'standard' => 'Standard',
        ],
    ],

    'update' => [
        'page_title' => 'Edit form',
        'layout_title' => 'Edit form',

        'back' => '← Back to list',
        'title' => 'Edit form',
        'subtitle' => 'Update questions, titles, and visibility settings.',

        'language' => [
            'label' => 'Language',
            'lv' => 'Latvian',
            'en' => 'English',
            'lv_short' => 'LV',
            'en_short' => 'EN',
        ],

        'basic' => [
            'heading' => 'Basic information',

            'title_lv' => 'Title (LV)',
            'title_en' => 'Title (EN)',

            'title_lv_placeholder' => 'e.g., Customer Satisfaction (LV)',
            'title_en_placeholder' => 'e.g., Customer Satisfaction',
        ],

        'visibility' => [
            'label' => 'Visibility',
            'public' => 'Public',
            'private' => 'Private',
            'public_hint' => 'Public — anyone with the link can respond',
            'private_hint' => 'Private — restricted access',
        ],

        'questions' => [
            'heading' => 'Questions',
            'total_suffix' => 'total',
            'empty' => 'The list is empty. Add your first question.',
            'add_question' => 'Add question',
        ],

        'field' => [
            'type' => 'Type',
            'delete_title' => 'Delete question',

            'types' => [
                'radio'    => 'Radio choice',
                'checkbox' => 'Checkbox',
                'dropdown' => 'Dropdown',
                'text'     => 'Text input',
                'scale'    => 'Scale',
            ],

            'question_lv_placeholder' => 'Question (LV)',
            'question_en_placeholder' => 'Question (EN)',
        ],

        'options' => [
            'label' => 'Options',
            'add' => 'Add option',
            'lv_placeholder' => 'Option (LV)',
            'en_placeholder' => 'Option (EN)',
        ],

        'text' => [
            'placeholder_lv' => 'Placeholder (LV)',
            'placeholder_en' => 'Placeholder (EN)',
        ],

        'scale' => [
            'min_value' => 'Min value',
            'max_value' => 'Max value',
            'min_label' => 'Min label',
            'max_label' => 'Max label',
            'preview' => 'Preview',
            'min_fallback' => 'Min',
            'max_fallback' => 'Max',
        ],

        'actions' => [
            'save' => 'Save changes',
            'saving' => 'Saving...',
        ],

        'toast' => [
            'success' => 'Form updated!',
            'error' => 'Error saving changes.',
        ],

        'specialist' => 'Specialist',
        'psoriasis'  => 'Psoriasis',
        'chronic'    => 'Chronic',
    ],

    'selector' => [
        'page_title'     => 'Form selector',
        'heading'        => 'Assign form types',
        'subheading'     => 'Select a type for each form to control where submissions go.',
        'code'           => 'Form code',
        'select_type'    => 'Select type…',
        'save'           => 'Save',
        'no_results'     => 'No forms found.',
        'error_missing'  => 'Please select a type before saving.',
        'success'        => 'Type saved successfully.',
        'error'          => 'Failed to save. Please try again.',

        // ✅ added (used by SelectorAnketa UI)
        'config'         => 'Configuration',
        'choose_form'    => 'Choose a form...',
        'selected'       => 'Selected',
        'none_selected'  => 'No form selected',
        'saving'         => 'Saving...',
    ],

    'create' => [
        'page_title'   => 'Create form',
        'layout_title' => 'Create form',

        'label'      => 'Form studio',
        'heading'    => 'Create a new form',
        'subheading' => 'Configure titles, visibility, and add questions.',

        'language' => [
            'label' => 'Language',
            'lv' => 'Latvian',
            'en' => 'English',
            'lv_short' => 'LV',
            'en_short' => 'EN',
        ],

        'actions' => [
            'cancel' => 'Cancel',
            'save'   => 'Save',
        ],

        'basic' => [
            'heading' => 'Basic information',

            'title_lv' => 'Title (LV)',
            'title_en' => 'Title (EN)',

            'title_lv_placeholder' => 'e.g., Customer Satisfaction (LV)',
            'title_en_placeholder' => 'e.g., Customer Satisfaction',
        ],

        'questions' => [
            'heading' => 'Questions',
            'total_suffix' => 'total',
            'empty' => 'The list is empty. Add your first question.',
            'add'   => 'Add question',
        ],

        'field' => [
            'type' => 'Type',
            'delete_title' => 'Delete question',

            'types' => [
                'radio'    => 'Radio choice',
                'checkbox' => 'Checkbox',
                'dropdown' => 'Dropdown',
                'text'     => 'Text input',
                'scale'    => 'Scale 1–10',
            ],

            'question_lv_placeholder' => 'Question (LV)',
            'question_en_placeholder' => 'Question (EN)',
        ],

        'options' => [
            'add' => 'Add option',
            'lv_placeholder' => 'Option (LV)',
            'en_placeholder' => 'Option (EN)',
        ],

        'text' => [
            'placeholder_lv' => 'Placeholder (LV)',
            'placeholder_en' => 'Placeholder (EN)',
        ],

        'scale' => [
            'min_value' => 'Min value',
            'max_value' => 'Max value',
            'preview'   => 'Preview',
            'min_fallback' => 'Min',
            'max_fallback' => 'Max',
        ],

        'sidebar' => [
            'settings' => 'Settings',
            'visibility' => 'Visibility',
            'public'  => 'Public',
            'private' => 'Private',
            'questions' => 'Questions',
            'status' => 'Status',
            'draft'  => 'Draft',
            'save'   => 'Save form',
        ],

        'validation' => [
            'title'   => 'Validation error',
            'message' => 'Please fix errors before saving.',
        ],

        'modal' => [
            'continue' => 'Continue',
            'close'    => 'Close',
        ],
    ],

    'show' => [
        'page_title'   => 'Form preview',
        'preview'      => 'Preview',
        'no_questions' => 'This form has no questions.',
        'public'       => 'Public',
        'private'      => 'Private',
    ],

    'field' => [
        'radio'    => 'Single choice',
        'checkbox' => 'Multiple choice',
        'dropdown' => 'Dropdown',
        'text'     => 'Text input',
        'scale'    => 'Scale',
        'no_options' => 'No options defined.',
    ],

    'misc' => [
        'untitled_form'     => 'Untitled form',
        'untitled_question' => 'Untitled',
    ],
];

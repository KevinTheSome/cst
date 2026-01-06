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

        // Optional alias if any code uses delete_confirm
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

    // ✅ Added: results translations (list + show pages)
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

        // Filters inside results (used by ResultsIndex modal)
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

        // Show page strings (ResultsShow)
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
        'back'                   => '← Back to list',
        'title'                  => 'Edit form',
        'form_title_placeholder' => 'Form title',
        'visibility_public'      => 'Public — anyone with the link can respond',
        'visibility_private'     => 'Private — restricted access',
        'add_question'           => 'Add question',
        'options_label'          => 'Options:',
        'add_option'             => 'Add option',
        'save'                   => 'Save changes',
        'saving'                 => 'Saving...',
        'success'                => 'Form updated!',
        'error'                  => 'Error saving changes.',
        'specialist'             => 'Specialist',
        'psoriasis'              => 'Psoriasis',
        'chronic'                => 'Chronic',
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
    ],
    'create' => [
    'page_title'   => 'Izveidot anketu',
    'layout_title' => 'Izveidot anketu',

    'label'      => 'Anketu studija',
    'heading'    => 'Izveidot jaunu anketu',
    'subheading' => 'Konfigurējiet nosaukumus, redzamību un pievienojiet jautājumus.',

    'actions' => [
        'cancel' => 'Atcelt',
        'save'   => 'Saglabāt',
    ],

    'basic' => [
        'heading' => 'Pamatinformācija',

        'title_lv' => 'Nosaukums (LV)',
        'title_en' => 'Nosaukums (EN)',

        'title_lv_placeholder' => 'Piem., Klientu apmierinātība',
        'title_en_placeholder' => 'e.g., Customer Satisfaction',
    ],

    'questions' => [
        'heading' => 'Jautājumi',
        'total_suffix' => 'kopā',
        'empty' => 'Saraksts ir tukšs. Pievienojiet pirmo jautājumu.',
        'add'   => 'Pievienot jautājumu',
    ],

    'field' => [
        'type' => 'Tips',
        'delete_title' => 'Dzēst jautājumu',

        'types' => [
            'radio'    => 'Radio izvēle',
            'checkbox' => 'Atzīmējamie',
            'dropdown' => 'Izvēlne',
            'text'     => 'Teksta ievade',
            'scale'    => 'Skala 1–10',
        ],

        'question_lv_placeholder' => 'Jautājums (LV)',
        'question_en_placeholder' => 'Jautājums (EN)',
    ],

    'options' => [
        'add' => 'Pievienot opciju',
        'lv_placeholder' => 'Opcija (LV)',
        'en_placeholder' => 'Option (EN)',
    ],

    'text' => [
        'placeholder_lv' => 'Placeholder (LV)',
        'placeholder_en' => 'Placeholder (EN)',
    ],

    'scale' => [
        'min_value' => 'Min vērtība',
        'max_value' => 'Max vērtība',
        'preview'   => 'Priekšskatījums',
        'min_fallback' => 'Min',
        'max_fallback' => 'Max',
    ],

    'sidebar' => [
        'settings' => 'Iestatījumi',
        'visibility' => 'Redzamība',
        'public'  => 'Publiska',
        'private' => 'Privāta',
        'questions' => 'Jautājumi',
        'status' => 'Statuss',
        'draft'  => 'Melnraksts',
        'save'   => 'Saglabāt anketu',
    ],

    'validation' => [
        'title'   => 'Validācijas kļūda',
        'message' => 'Lūdzu izlabojiet kļūdas pirms saglabāšanas.',
    ],

    'modal' => [
        'continue' => 'Turpināt',
        'close'    => 'Aizvērt',
    ],
],

];

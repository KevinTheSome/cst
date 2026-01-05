<?php

return [
    'index' => [
        'page_title'      => 'Anketas',
        'label'           => 'Anketas',
        'heading'         => 'Visas anketas',
        'subheading'      => 'Pārskats par visām publiskajām un privātajām formām.',
        'create_button'   => '+ Izveidot jaunu anketu',
        'list_label'      => 'Anketu saraksts',
        'list_subheading' => 'Noklikšķiniet Skatīt, lai atvērtu formu, vai Rediģēt / Dzēst to.',
        'id_label'        => 'ID',
        'code_label'      => 'Kods',

        'view'            => 'Skatīt',
        'edit'            => 'Rediģēt',
        'delete'          => 'Dzēst',

        'empty'           => 'Vēl nav anketu.',
        'confirm_delete'  => 'Vai tiešām dzēst anketu "{title}"?',
        'deleted_success' => 'Anketa veiksmīgi izdzēsta.',
        'deleted_error'   => 'Kļūda dzēšot anketu.',

        'search_placeholder' => 'Meklēt...',
        'na' => 'N/A',

        // Optional alias if any code uses delete_confirm
        'delete_confirm' => 'Vai tiešām dzēst šo anketu?',

        'filters' => [
            'title' => 'Filtri',
            'type' => 'Tips',
            'any_type' => 'Jebkurš tips',
            'public' => 'Publiska',
            'private' => 'Privāta',
            'code' => 'Kods',
            'from' => 'No',
            'to' => 'Līdz',
        ],

        'actions' => [
            'reset' => 'Atiestatīt',
            'filters' => 'Filtri',
            'clear_filters' => 'Notīrīt filtrus',
            'clear' => 'Notīrīt',
            'apply' => 'Pielietot',
            'create_new_aria' => 'Izveidot jaunu',
        ],

        'misc' => [
            'untitled' => 'Nenosaukta anketa',
        ],
    ],

    // ✅ THIS is what you were missing (results must be here)
    'results' => [
        'page_title' => 'Anketu atbildes',
        'layout_title' => 'Anketu atbildes',

        'label' => 'Anketu atbildes',
        'heading' => 'Anketu atbildes',
        'subheading' => 'Pārskats par iesniegtajām atbildēm un to saturu.',

        'total_answers' => 'Kopā atbildes',
        'search_placeholder' => 'Meklēt atbildēs...',

        'table' => [
            'id_code' => 'ID / KODS',
            'type' => 'TIPS',
            'submitted' => 'IESNIEGTS',
            'answers' => 'ATBILDES',
            'action' => 'DARBĪBA',
        ],

        'empty' => 'Nav atrastu atbilžu.',
        'empty_hint' => 'Pamēģiniet mainīt filtrus vai meklēšanas frāzi.',

        'actions' => [
            'filters' => 'Filtri',
            'view' => 'Skatīt',
            'reset' => 'Atiestatīt',
            'clear' => 'Notīrīt',
            'apply' => 'Pielietot',
        ],

        // Filters inside results (used by ResultsIndex modal)
        'filters' => [
            'type' => 'Tips',
            'code' => 'Kods',
            'code_placeholder' => 'Kods...',
            'date_range' => 'Iesniegšanas datumu diapazons',
            'from' => 'No',
            'to' => 'Līdz',
            'sort' => 'Kārtošana',
            'newest' => 'Jaunākie vispirms',
            'oldest' => 'Vecākie vispirms',
        ],

        // Show page strings (ResultsShow)
        'view_title' => 'Iesniegums',
        'view_layout_title' => 'Iesniegums',
        'view_label' => 'Iesniegums',
        'view_subheading' => 'Pilnas atbildes no viena iesnieguma.',

        'field_id' => 'ID',
        'field_type' => 'Tips',
        'field_code' => 'Kods',
        'field_submitted' => 'Iesniegts',

        'answers_heading' => 'Atbildes',
        'answers_note' => 'Tikai administratoriem ir piekļuve šai informācijai.',
        'answers_empty' => 'Nav saglabātu atbilžu.',

        'misc' => [
            'dash' => '—',
            'standard' => 'Standarts',
        ],
    ],

    'update' => [
        'back'                   => '← Atpakaļ uz sarakstu',
        'title'                  => 'Rediģēt formu',
        'form_title_placeholder' => 'Anketes nosaukums',
        'visibility_public'      => 'Publiska — ikviens ar saiti var atbildēt',
        'visibility_private'     => 'Privāta — ierobežota piekļuve',
        'add_question'           => 'Pievienot jautājumu',
        'options_label'          => 'Opcijas:',
        'add_option'             => 'Pievienot opciju',
        'save'                   => 'Saglabāt izmaiņas',
        'saving'                 => 'Saglabā...',
        'success'                => 'Forma atjaunināta!',
        'error'                  => 'Kļūda saglabājot izmaiņas.',
        'specialist'             => 'Speciālists',
        'psoriasis'              => 'Psoriāze',
        'chronic'                => 'Hronisks',
    ],

    'selector' => [
        'page_title'     => 'Anketu selektors',
        'heading'        => 'Piešķirt anketu tipus',
        'subheading'     => 'Izvēlieties katrai formai tipu, lai kontrolētu, kur tiek novirzītas atbildes.',
        'code'           => 'Anketas kods',
        'select_type'    => 'Izvēlieties tipu…',
        'save'           => 'Saglabāt',
        'no_results'     => 'Nav atrastu anketu.',
        'error_missing'  => 'Lūdzu, izvēlieties tipu pirms saglabāšanas.',
        'success'        => 'Tips veiksmīgi saglabāts.',
        'error'          => 'Neizdevās saglabāt. Lūdzu, mēģiniet vēlreiz.',
    ],
];

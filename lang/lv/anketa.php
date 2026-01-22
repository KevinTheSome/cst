<?php

return [
    'index' => [
        'page_title'      => 'Anketas',
        'label'           => 'Anketas',
        'heading'         => 'Visas anketas',
        'subheading'      => 'Pārskats par publiskām un privātām anketām.',
        'create_button'   => '+ Izveidot jaunu anketu',
        'list_label'      => 'Anketu saraksts',
        'list_subheading' => 'Spiediet Skatīt, lai atvērtu anketu, vai Rediģēt / Dzēst.',
        'id_label'        => 'ID',
        'code_label'      => 'Kods',

        'view'            => 'Skatīt',
        'edit'            => 'Rediģēt',
        'delete'          => 'Dzēst',

        'empty'           => 'Vēl nav anketu.',
        'confirm_delete'  => 'Vai tiešām vēlaties dzēst anketu "{title}"?',
        'deleted_success' => 'Anketa veiksmīgi dzēsta.',
        'deleted_error'   => 'Kļūda dzēšot anketu.',

        'search_placeholder' => 'Meklēt...',
        'na' => 'N/A',

        'delete_confirm' => 'Vai tiešām vēlaties dzēst šo anketu?',

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

    'results' => [
        'page_title' => 'Iesniegumi',
        'layout_title' => 'Iesniegumi',

        'label' => 'Iesniegumi',
        'heading' => 'Iesniegumi',
        'subheading' => 'Pārskats par iesniegtajām atbildēm un to saturu.',

        'total_answers' => 'Kopā atbilžu',
        'search_placeholder' => 'Meklēt iesniegumus...',

        'table' => [
            'id_code' => 'ID / KODS',
            'type' => 'TIPS',
            'submitted' => 'IESNIEGTS',
            'answers' => 'ATBILDES',
            'action' => 'DARBĪBA',
        ],

        'empty' => 'Nav atrasti iesniegumi.',
        'empty_hint' => 'Pamēģiniet mainīt filtrus vai meklēšanas vaicājumu.',

        'actions' => [
            'filters' => 'Filtri',
            'view' => 'Skatīt',
            'reset' => 'Atiestatīt',
            'clear' => 'Notīrīt',
            'apply' => 'Pielietot',
        ],

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

        'view_title' => 'Iesniegums',
        'view_layout_title' => 'Iesniegums',
        'view_label' => 'Iesniegums',
        'view_subheading' => 'Pilnas atbildes no viena anketas iesnieguma.',

        'field_id' => 'ID',
        'field_type' => 'Tips',
        'field_code' => 'Kods',
        'field_submitted' => 'Iesniegts',

        'answers_heading' => 'Atbildes',
        'answers_note' => 'Šo informāciju var skatīt tikai administratori.',
        'answers_empty' => 'Nav saglabātu atbilžu.',

        'misc' => [
            'dash' => '—',
            'standard' => 'Standarta',
        ],
    ],

    'update' => [
        'page_title' => 'Rediģēt anketu',
        'layout_title' => 'Rediģēt anketu',

        'back' => '← Atpakaļ uz sarakstu',
        'title' => 'Rediģēt anketu',
        'subtitle' => 'Atjauniniet jautājumus, nosaukumus un redzamības iestatījumus.',

        'language' => [
            'label' => 'Valoda',
            'lv' => 'Latviešu',
            'en' => 'Angļu',
            'lv_short' => 'LV',
            'en_short' => 'EN',
        ],

        'basic' => [
            'heading' => 'Pamatinformācija',
            'title_lv' => 'Nosaukums (LV)',
            'title_en' => 'Nosaukums (EN)',
            'title_lv_placeholder' => 'Piem., Klientu apmierinātība',
            'title_en_placeholder' => 'e.g., Customer Satisfaction',
        ],

        'visibility' => [
            'label' => 'Redzamība',
            'public' => 'Publiska',
            'private' => 'Privāta',
            'public_hint' => 'Publiska — ikviens ar saiti var atbildēt',
            'private_hint' => 'Privāta — ierobežota piekļuve',
        ],

        'questions' => [
            'heading' => 'Jautājumi',
            'total_suffix' => 'kopā',
            'empty' => 'Saraksts ir tukšs. Pievienojiet pirmo jautājumu.',
            'add_question' => 'Pievienot jautājumu',
        ],

        'field' => [
            'type' => 'Tips',
            'delete_title' => 'Dzēst jautājumu',

            'types' => [
                'radio'    => 'Radio izvēle',
                'checkbox' => 'Atzīmējamie (checkbox)',
                'dropdown' => 'Izvēlne (dropdown)',
                'text'     => 'Teksta ievade',
                'scale'    => 'Skala',
            ],

            'question_lv_placeholder' => 'Jautājums (LV)',
            'question_en_placeholder' => 'Question (EN)',
        ],

        'options' => [
            'label' => 'Opcijas',
            'add' => 'Pievienot opciju',
            'lv_placeholder' => 'Opcija (LV)',
            'en_placeholder' => 'Option (EN)',
        ],

        'text' => [
            'placeholder_lv' => 'Viettura teksts (LV)',
            'placeholder_en' => 'Placeholder (EN)',
        ],

        'scale' => [
            'min_value' => 'Min vērtība',
            'max_value' => 'Max vērtība',
            'min_label' => 'Min etiķete',
            'max_label' => 'Max etiķete',
            'preview'   => 'Priekšskatījums',
            'min_fallback' => 'Min',
            'max_fallback' => 'Max',
        ],

        'actions' => [
            'save' => 'Saglabāt izmaiņas',
            'saving' => 'Saglabā...',
        ],

        'toast' => [
            'success' => 'Anketa atjaunināta!',
            'error' => 'Kļūda saglabājot izmaiņas.',
        ],

        'specialist' => 'Speciālists',
        'psoriasis'  => 'Psoriāze',
        'chronic'    => 'Hronisks',
    ],

    'selector' => [
        'page_title'     => 'Anketu selektors',
        'heading'        => 'Piešķirt anketu tipus',
        'subheading'     => 'Izvēlieties tipu katrai anketei, lai noteiktu, kur nonāk iesniegumi.',
        'code'           => 'Anketas kods',
        'select_type'    => 'Izvēlēties tipu…',
        'save'           => 'Saglabāt',
        'no_results'     => 'Nav atrasta neviena anketa.',
        'error_missing'  => 'Lūdzu, izvēlieties tipu pirms saglabāšanas.',
        'success'        => 'Tips veiksmīgi saglabāts.',
        'error'          => 'Neizdevās saglabāt. Lūdzu, mēģiniet vēlreiz.',

        // ✅ added (used by SelectorAnketa UI)
        'config'         => 'Konfigurācija',
        'choose_form'    => 'Izvēlies anketu...',
        'selected'       => 'Izvēlēts',
        'none_selected'  => 'Nav izvēlēta anketa',
        'saving'         => 'Notiek saglabāšana...',
    ],

    'create' => [
        'page_title'   => 'Izveidot anketu',
        'layout_title' => 'Izveidot anketu',

        'label'      => 'Anketu studija',
        'heading'    => 'Izveidot jaunu anketu',
        'subheading' => 'Iestatiet nosaukumus, redzamību un pievienojiet jautājumus.',

        'language' => [
            'label' => 'Valoda',
            'lv' => 'Latviešu',
            'en' => 'Angļu',
            'lv_short' => 'LV',
            'en_short' => 'EN',
        ],

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
                'checkbox' => 'Atzīmējamie (checkbox)',
                'dropdown' => 'Izvēlne (dropdown)',
                'text'     => 'Teksta ievade',
                'scale'    => 'Skala 1–10',
            ],

            'question_lv_placeholder' => 'Jautājums (LV)',
            'question_en_placeholder' => 'Question (EN)',
        ],

        'options' => [
            'add' => 'Pievienot opciju',
            'lv_placeholder' => 'Opcija (LV)',
            'en_placeholder' => 'Option (EN)',
        ],

        'text' => [
            'placeholder_lv' => 'Viettura teksts (LV)',
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
            'message' => 'Lūdzu, izlabojiet kļūdas pirms saglabāšanas.',
        ],

        'modal' => [
            'continue' => 'Turpināt',
            'close'    => 'Aizvērt',
        ],
    ],

    'show' => [
        'page_title'   => 'Anketas priekšskatījums',
        'preview'      => 'Priekšskatījums',
        'no_questions' => 'Šai anketai nav pievienoti jautājumi.',
        'public'       => 'Publiska',
        'private'      => 'Privāta',
    ],

    'field' => [
        'radio'    => 'Izvēle (viens variants)',
        'checkbox' => 'Izvēle (vairāki varianti)',
        'dropdown' => 'Izkrītošais saraksts',
        'text'     => 'Teksta ievade',
        'scale'    => 'Skala',
        'no_options' => 'Nav definēti atbilžu varianti.',
    ],

    'misc' => [
        'untitled_form'     => 'Nenosaukta anketa',
        'untitled_question' => 'Bez nosaukuma',
    ],
];

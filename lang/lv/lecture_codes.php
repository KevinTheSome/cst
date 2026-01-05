<?php

return [
    'page_title' => 'Lekciju kodi',
    'layout_title' => 'Lekciju kodi',
    'heading' => 'Lekciju piekļuve',
    'subheading' => 'Pārvaldiet validācijas kodus tiešsaistes kursu piekļuvei.',

    'create' => [
        'title' => 'Ģenerēt jaunu kodu',
        'custom_code_label' => 'Pielāgots kods (nav obligāts)',
        'custom_code_placeholder' => 'Atstājiet tukšu automātiskai ģenerēšanai',
        'trainings_label' => 'Attiecināmās apmācības',
        'no_trainings' => 'Nav pieejamu apmācību',
        'selected' => 'Izvēlēts',
        'max_uses_label' => 'Maks. lietojumi',
        'max_uses_hint' => 'Norādiet 0 neierobežotam lietojumam.',
        'creating' => 'Izveido...',
        'create_button' => 'Izveidot piekļuves kodu',
    ],

    'table' => [
        'title' => 'Aktīvie kodi',
        'records' => 'ieraksti',
        'th_code_date' => 'Kods un datums',
        'th_scope' => 'Piekļuves apjoms',
        'th_usage' => 'Lietojums',
        'th_status' => 'Statuss',
        'th_actions' => 'Darbības',
    ],

    'status' => [
        'active' => 'Aktīvs',
        'inactive' => 'Neaktīvs',
    ],

    'actions' => [
        'edit' => 'Rediģēt',
        'regenerate' => 'Ģenerēt no jauna',
        'delete' => 'Dzēst',
        'cancel' => 'Atcelt',
        'ok' => 'Labi',
        'processing' => 'Apstrādā...',
        'confirm_delete' => 'Jā, dzēst',
        'confirm_regenerate' => 'Jā, ģenerēt no jauna',
    ],

    'empty' => [
        'title' => 'Kodi nav atrasti',
        'subtitle' => 'Izveidojiet savu pirmo piekļuves kodu augstāk.',
    ],

    'confirm' => [
        'delete_title' => 'Dzēst piekļuves kodu?',
        'regenerate_title' => 'Ģenerēt kodu no jauna?',
        'delete_text' => 'Vai tiešām dzēst kodu ":code"? Šo darbību nevar atsaukt.',
        'regenerate_text' => 'Šī darbība aizstās kodu ":code" ar jaunu nejaušu virkni. Vecais kods vairs nedarbosies nekavējoties.',
    ],

    'edit' => [
        'title' => 'Rediģēt piekļuves kodu',
        'code_label' => 'Koda virkne',
        'trainings_label' => 'Piešķirtās apmācības',
        'no_trainings' => 'Nav pieejamu apmācību',
        'max_uses_label' => 'Maks. lietojumi',
        'saving' => 'Saglabā...',
        'save' => 'Saglabāt izmaiņas',
    ],

    'alerts' => [
        'success' => 'Veiksmīgi',
        'error' => 'Kļūda',
        'created' => 'Kods veiksmīgi izveidots!',
        'updated' => 'Kods veiksmīgi atjaunināts.',
        'deleted' => 'Piekļuves kods dzēsts.',
        'regenerated' => 'Kods veiksmīgi ģenerēts no jauna.',
        'action_failed' => 'Darbība neizdevās. Lūdzu, mēģiniet vēlreiz.',
    ],

    'errors' => [
        'max_uses_non_negative' => 'Maks. lietojumiem jābūt >= 0',
        'create_failed' => 'Neizdevās izveidot kodu.',
        'update_failed' => 'Neizdevās atjaunināt kodu.',
    ],

    'misc' => [
        'dash' => '—',
        'training' => 'Apmācība',
        'all_trainings' => 'Visas apmācības',
        'all_universal' => 'Visas (universāla piekļuve)',
    ],
];

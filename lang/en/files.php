<?php

return [
    'index' => [
        'page_title' => 'Files',
        'layout_title' => 'Files',
        'heading' => 'File Management',
        'subheading' => 'Upload, organize and manage your stored files',
        'create' => 'Create New File',
        'search_placeholder' => 'Search files by title or ID...',
        // Optional string with placeholders
        'found' => 'Found {count} files matching "{q}"',
    ],

    'upload' => [
        'page_title' => 'Upload File',
        'layout_title' => 'Upload File',
        'heading' => 'Upload File',
        'subheading' => 'Upload CSV, TXT, PDF, images, etc. and tag them (LV/EN)',
        'tags_hint' => 'Add tag pairs — both LV and EN are recommended.',
        'no_tags' => 'No tags added yet.',
        'submit' => 'Upload',
        'uploading' => 'Uploading...',
    ],

    'edit' => [
        'page_title' => 'Edit File',
        'layout_title' => 'Edit File',
        'heading' => 'Edit File',
        'subheading' => 'Modify titles, replace file or update tags',
        'replace_file' => 'Replace File (optional)',
        'tags_hint' => 'Add tag pairs — both LV and EN recommended.',
        'no_tags' => 'No tags yet.',
        'submit' => 'Update File',
        'updating' => 'Updating...',
    ],

    'fields' => [
        'title_lv' => 'Title (LV)',
        'title_en' => 'Title (EN)',
        'file' => 'File',
        'tags' => 'Tags (LV / EN)',
    ],

    'placeholders' => [
        'title_lv' => 'Title in Latvian',
        'title_en' => 'Title in English',
        'tag_lv' => 'Tag (LV)',
        'tag_en' => 'Tag (EN)',
    ],

    'actions' => [
        'back_to_list' => 'Files',
        'back' => 'Back',
        'cancel' => 'Cancel',
        'add_tag' => 'Add Tag',
        'remove_tag' => 'Remove tag',
        'download' => 'Download',
        'edit' => 'Edit',
        'delete' => 'Delete',
        'deleting' => 'Deleting...',
    ],

    'confirm' => [
        'delete' => 'Are you sure you want to delete this file? This action cannot be undone.',
    ],

    'empty' => [
        'no_results' => 'No files found',
        'no_results_hint' => 'No files match "{q}". Try a different search term.',
        'none' => 'No files uploaded yet',
        'none_hint' => 'Get started by uploading your first file.',
        'upload_first' => 'Upload Your First File',
    ],

    'meta' => [
        'id' => 'ID',
        'type' => 'Type',
        'size' => 'Size',
    ],

    'misc' => [
        'untitled' => 'Untitled',
    ],
];

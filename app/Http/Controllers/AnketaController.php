<?php

namespace App\Http\Controllers;

use App\Models\FormResult;
use App\Models\Form;
use App\Models\FormType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AnketaController extends Controller
{
    /**
     * Admin: list stored form data
     */
    public function index()
    {
        $forms = Form::orderBy('created_at', 'desc')->get();

        $formData = $forms->map(function ($form) {
            return [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $form->title,
                'data' => [
                    'title' => $form->title,
                    'fields' => $form->data['fields'] ?? [],
                ],
            ];
        });

        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formData' => $formData,
        ]);
    }

    /**
     * Admin: show single stored result
     */
    public function show($id)
    {
        syncLangFiles('formcodes');
        $form = Form::findOrFail($id);
        $data = $form->data ?? [];

        $normalizedFields = collect($data['fields'] ?? [])
            ->map(function ($f) {
                return [
                    'label' => [
                        'lv' => $f['label']['lv'] ?? $f['label'] ?? '',
                        'en' => $f['label']['en'] ?? $f['label'] ?? '',
                    ],
                    'type' => $f['type'] ?? 'radio',
                    'options' => [
                        'lv' => $f['options']['lv'] ?? $f['options'] ?? [],
                        'en' => $f['options']['en'] ?? $f['options'] ?? [],
                    ],
                    'placeholder' => $f['placeholder'] ?? null,
                    'scale' => $f['scale'] ?? null,
                ];
            })
            ->toArray();

        return Inertia::render('Admin/Anketa/showAnketa', [
            'formResult' => [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $form->title,
                'data' => [
                    'title' => $data['title'] ?? $form->title,
                    'fields' => $normalizedFields,
                ],
            ],
        ]);
    }

    /**
     * Admin: create a new form template
     */
    public function create()
    {
        syncLangFiles('formcodes');
        return Inertia::render('Admin/Anketa/createAnketa');
    }

    /**
     * Admin: store form template
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|array',
            'title.lv' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',
            'visibility' => 'required|string|in:public,private',
            'schema.fields' => 'array|nullable',

            'schema.fields.*.id' => 'required|string',
            'schema.fields.*.type' => 'required|string|in:radio,checkbox,dropdown,text,scale',
            'schema.fields.*.label.lv' => 'required|string|max:255',
            'schema.fields.*.label.en' => 'required|string|max:255',

            'schema.fields.*.options.lv.*' => 'sometimes|required|string|max:255',
            'schema.fields.*.options.en.*' => 'sometimes|required|string|max:255',

            'schema.fields.*.placeholder.lv' => 'sometimes|required|string|max:255',
            'schema.fields.*.placeholder.en' => 'sometimes|required|string|max:255',

            'schema.fields.*.scale.min' => 'sometimes|required|integer|min:1|max:100',
            'schema.fields.*.scale.max' => 'sometimes|required|integer|min:1|max:100',
            'schema.fields.*.scale.minLabel.lv' => 'sometimes|string|nullable|max:255',
            'schema.fields.*.scale.minLabel.en' => 'sometimes|string|nullable|max:255',
            'schema.fields.*.scale.maxLabel.lv' => 'sometimes|string|nullable|max:255',
            'schema.fields.*.scale.maxLabel.en' => 'sometimes|string|nullable|max:255',
        ]);

        $form = Form::create([
            'code' => $data['visibility'],
            'title' => $data['title'],
            'data' => [
                'fields' => collect($data['schema']['fields'] ?? [])->map(function ($f) {
                    return [
                        'id' => $f['id'],
                        'type' => $f['type'],
                        'label' => $f['label'] ?? [],
                        'options' => $f['options'] ?? [],
                        'placeholder' => $f['placeholder'] ?? null,
                        'scale' => $f['scale'] ?? null,
                    ];
                })->toArray(),
            ],
        ]);

        return response()->json(['message' => 'Anketa izveidota!', 'form' => $form]);
    }

    /**
     * Admin: edit form template
     */
    public function edit($id)
    {
        $form = Form::findOrFail($id);
        $data = $form->data ?? [];

        // Normalize fields to ensure proper structure
        $normalizedFields = collect($data['fields'] ?? [])
            ->map(function ($f) {
                $normalized = [
                    'id' => $f['id'] ?? (string) Str::uuid(),
                    'type' => $f['type'] ?? 'radio',
                    'label' => [
                        'lv' => $f['label']['lv'] ?? $f['label'] ?? '',
                        'en' => $f['label']['en'] ?? $f['label'] ?? '',
                    ],
                ];

                // Add type-specific fields
                if (in_array($f['type'] ?? '', ['radio', 'checkbox', 'dropdown'])) {
                    $normalized['options'] = [
                        'lv' => $f['options']['lv'] ?? $f['options'] ?? [],
                        'en' => $f['options']['en'] ?? $f['options'] ?? [],
                    ];
                } elseif ($f['type'] === 'text') {
                    $normalized['placeholder'] = [
                        'lv' => $f['placeholder']['lv'] ?? $f['placeholder'] ?? '',
                        'en' => $f['placeholder']['en'] ?? $f['placeholder'] ?? '',
                    ];
                } elseif ($f['type'] === 'scale') {
                    $normalized['scale'] = [
                        'min' => $f['scale']['min'] ?? 1,
                        'max' => $f['scale']['max'] ?? 10,
                        'minLabel' => [
                            'lv' => $f['scale']['minLabel']['lv'] ?? '',
                            'en' => $f['scale']['minLabel']['en'] ?? '',
                        ],
                        'maxLabel' => [
                            'lv' => $f['scale']['maxLabel']['lv'] ?? '',
                            'en' => $f['scale']['maxLabel']['en'] ?? '',
                        ],
                    ];
                }

                return $normalized;
            })
            ->toArray();

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'form' => [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $form->title,
                'data' => [
                    'title' => $data['title'] ?? $form->title,
                    'fields' => $normalizedFields,
                ],
            ]
        ]);
    }


    /**
     * Admin: update form template
     */
    public function update(Request $request, $id)
    {
        $form = Form::findOrFail($id);

        $validated = $request->validate([
            // Top-level title (single source of truth)
            'title' => 'required|array',
            'title.lv' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',

            // visibility / code
            'code' => 'required|string|in:public,private',

            // data.fields (optional but if present must follow shape)
            'data' => 'nullable|array',
            'data.fields' => 'nullable|array',
            'data.fields.*.id' => 'required_with:data.fields|string',
            'data.fields.*.type' => 'required_with:data.fields|string|in:text,radio,checkbox,dropdown,scale',
            'data.fields.*.label' => 'required_with:data.fields|array',
            'data.fields.*.label.lv' => 'required_with:data.fields|string|max:255',
            'data.fields.*.label.en' => 'required_with:data.fields|string|max:255',

            // options
            'data.fields.*.options' => 'nullable|array',
            'data.fields.*.options.lv' => 'nullable|array',
            'data.fields.*.options.lv.*' => 'sometimes|required|string|max:255',
            'data.fields.*.options.en' => 'nullable|array',
            'data.fields.*.options.en.*' => 'sometimes|required|string|max:255',

            // placeholder
            'data.fields.*.placeholder' => 'nullable|array',
            'data.fields.*.placeholder.lv' => 'sometimes|string|nullable|max:255',
            'data.fields.*.placeholder.en' => 'sometimes|string|nullable|max:255',

            // scale
            'data.fields.*.scale' => 'nullable|array',
            'data.fields.*.scale.min' => 'sometimes|required|integer|min:1|max:100',
            'data.fields.*.scale.max' => 'sometimes|required|integer|min:1|max:100',
            'data.fields.*.scale.minLabel' => 'nullable|array',
            'data.fields.*.scale.minLabel.lv' => 'sometimes|string|nullable|max:255',
            'data.fields.*.scale.minLabel.en' => 'sometimes|string|nullable|max:255',
            'data.fields.*.scale.maxLabel' => 'nullable|array',
            'data.fields.*.scale.maxLabel.lv' => 'sometimes|string|nullable|max:255',
            'data.fields.*.scale.maxLabel.en' => 'sometimes|string|nullable|max:255',
        ]);

        // Build data payload — keep only fields under data (do not duplicate title inside data)
        $dataPayload = [
            'fields' => collect($validated['data']['fields'] ?? [])->map(function ($f) {
                return [
                    'id' => $f['id'],
                    'type' => $f['type'],
                    'label' => $f['label'] ?? [],
                    'options' => $f['options'] ?? [],
                    'placeholder' => $f['placeholder'] ?? null,
                    'scale' => $f['scale'] ?? null,
                ];
            })->toArray(),
        ];

        $form->update([
            'code' => $validated['code'],
            'title' => [
                'lv' => $validated['title']['lv'] ?? ($form->title['lv'] ?? ''),
                'en' => $validated['title']['en'] ?? ($form->title['en'] ?? ''),
            ],
            'data' => $dataPayload,
        ]);

        return response()->json([
            'message' => 'Form updated successfully',
            'form' => $form->fresh(),
        ], 200);
    }

    /**
     * Admin: delete form template
     */
    public function destroy($id)
    {
        $formResult = Form::findOrFail($id);
        $formResult->delete();

        return redirect()->route('admin.anketa');
    }

    /**
     * Public route: load a form page by its code
     */
    public function loadByCode(string $code)
    {
        $formType = FormType::where('type', $code)->first();

        if (!$formType) {
            return Inertia::render('Formas/forma', ['form' => null]);
        }

        $form = $formType->form;

        // normalize title (title may be json or string)
        $title = is_array($form->title)
            ? $form->title
            : (json_decode($form->title, true) ?? ['lv' => (string)$form->title, 'en' => (string)$form->title]);

        // normalize fields from data
        $schema = is_array($form->data) ? $form->data : json_decode($form->data ?? '{}', true);
        $fields = $schema['fields'] ?? [];

        return Inertia::render('Formas/forma', [
            'form' => [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $title,
                'data' => [
                    'fields' => $fields,
                ],
            ],
            'lang' => app()->getLocale(),
        ]);
    }

    /**
     * Public: show the code entry page for forms
     */
    public function showCode()
    {
        return Inertia::render('Formas/questions', [
            'locale' => app()->getLocale(),
        ]);
    }

    /**
     * Public: store submitted answers to form_results table.
     */
    public function storeAnswers(Request $request)
    {
        $data = $request->validate([
            'form_id' => 'nullable|integer',
            'code' => 'required|string',
            'title' => 'nullable|string',
            'answers' => 'required|array',
        ]);

        $title = $data['title'] ?? null;
        if (isset($data['form_id'])) {
            try {
                $form = Form::find($data['form_id']);
                if ($form) $title = $form->title ?? $title;
            } catch (\Exception $e) {
                Log::warning('Could not load Form by id in storeAnswers: ' . $e->getMessage());
            }
        }

        $result = FormResult::create([
            'code' => $data['code'],
            'title' => $title ?? 'Submission',
            'results' => [
                'answers' => $data['answers'],
                'submitted_at' => now()->toDateTimeString(),
            ],
        ]);

        Log::info('Anketa answers stored', [
            'form_result_id' => $result->id,
            'form_id' => $data['form_id'] ?? null,
            'code' => $data['code'],
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Answers stored.',
            'id' => $result->id,
        ]);
    }
}

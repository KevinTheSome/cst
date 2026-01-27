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
    public function index(Request $request)
    {
        // Savācam filtrus no query string
        $filters = $request->only([
            'type',
            'code',
            'from',
            'to',
            'search',
            'orderBy',
            'orderDir',
        ]);

        $query = Form::query();

        if (!empty($filters['type'])) {
            $query->where('code', $filters['type']);
        }

        if (!empty($filters['code'])) {
            $query->where('code', 'like', '%' . $filters['code'] . '%');
        }

        if (!empty($filters['from'])) {
            $query->whereDate('created_at', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('created_at', '<=', $filters['to']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];

            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', '%' . $search . '%')
                    ->orWhere('title->lv', 'like', '%' . $search . '%')
                    ->orWhere('title->en', 'like', '%' . $search . '%');
            });
        }

        $allowedOrderBy = ['id', 'code', 'created_at'];
        $orderBy = in_array($filters['orderBy'] ?? '', $allowedOrderBy, true)
            ? $filters['orderBy']
            : 'created_at';

        $orderDir = in_array($filters['orderDir'] ?? '', ['asc', 'desc'], true)
            ? $filters['orderDir']
            : 'desc';

        $forms = $query->orderBy($orderBy, $orderDir)->get();

        $formData = $forms->map(function ($form) {
            return [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $form->title,
                'created_at' => $form->created_at?->toDateTimeString(),
                'data' => [
                    'title' => $form->title,
                    'fields' => $form->data['fields'] ?? [],
                ],
            ];
        });

        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formData' => $formData,
            'filters' => [
                'type' => $filters['type'] ?? '',
                'code' => $filters['code'] ?? '',
                'from' => $filters['from'] ?? '',
                'to' => $filters['to'] ?? '',
                'search' => $filters['search'] ?? '',
                'orderBy' => $orderBy,
                'orderDir' => $orderDir,
            ],
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
                    'rows' => $f['rows'] ?? null,
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
            // ✅ textarea added
            'schema.fields.*.type' => 'required|string|in:radio,checkbox,dropdown,text,textarea,scale',
            'schema.fields.*.label.lv' => 'required|string|max:255',
            'schema.fields.*.label.en' => 'required|string|max:255',

            'schema.fields.*.options.lv.*' => 'sometimes|required|string|max:255',
            'schema.fields.*.options.en.*' => 'sometimes|required|string|max:255',

            'schema.fields.*.placeholder.lv' => 'sometimes|required|string|max:255',
            'schema.fields.*.placeholder.en' => 'sometimes|required|string|max:255',

            // optional rows for textarea
            'schema.fields.*.rows' => 'sometimes|integer|nullable|min:1|max:20',

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
                        'rows' => $f['rows'] ?? null,
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

                if (in_array($f['type'] ?? '', ['radio', 'checkbox', 'dropdown'], true)) {
                    $normalized['options'] = [
                        'lv' => $f['options']['lv'] ?? $f['options'] ?? [],
                        'en' => $f['options']['en'] ?? $f['options'] ?? [],
                    ];
                } elseif (in_array(($f['type'] ?? ''), ['text', 'textarea'], true)) {
                    $normalized['placeholder'] = [
                        'lv' => $f['placeholder']['lv'] ?? $f['placeholder'] ?? '',
                        'en' => $f['placeholder']['en'] ?? $f['placeholder'] ?? '',
                    ];
                    $normalized['rows'] = $f['rows'] ?? null;
                } elseif (($f['type'] ?? '') === 'scale') {
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
            'title' => 'required|array',
            'title.lv' => 'required|string|max:255',
            'title.en' => 'required|string|max:255',

            'code' => 'required|string|in:public,private',

            'data' => 'nullable|array',
            'data.fields' => 'nullable|array',
            'data.fields.*.id' => 'required_with:data.fields|string',
            // ✅ textarea added
            'data.fields.*.type' => 'required_with:data.fields|string|in:text,textarea,radio,checkbox,dropdown,scale',

            'data.fields.*.label' => 'required_with:data.fields|array',
            'data.fields.*.label.lv' => 'required_with:data.fields|string|max:255',
            'data.fields.*.label.en' => 'required_with:data.fields|string|max:255',

            'data.fields.*.options' => 'nullable|array',
            'data.fields.*.options.lv' => 'nullable|array',
            'data.fields.*.options.lv.*' => 'sometimes|required|string|max:255',
            'data.fields.*.options.en' => 'nullable|array',
            'data.fields.*.options.en.*' => 'sometimes|required|string|max:255',

            'data.fields.*.placeholder' => 'nullable|array',
            'data.fields.*.placeholder.lv' => 'sometimes|string|nullable|max:255',
            'data.fields.*.placeholder.en' => 'sometimes|string|nullable|max:255',

            // optional rows for textarea
            'data.fields.*.rows' => 'sometimes|integer|nullable|min:1|max:20',

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

        $dataPayload = [
            'fields' => collect($validated['data']['fields'] ?? [])->map(function ($f) {
                return [
                    'id' => $f['id'],
                    'type' => $f['type'],
                    'label' => $f['label'] ?? [],
                    'options' => $f['options'] ?? [],
                    'placeholder' => $f['placeholder'] ?? null,
                    'rows' => $f['rows'] ?? null,
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

        return back();
    }

    /**
     * Admin: delete form template
     */
    public function destroy(Request $request, $id)
    {
        $form = Form::findOrFail($id);
        $form->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Anketa dzēsta.']);
        }

        return redirect()
            ->route('admin.anketa')
            ->with('success', 'Anketa dzēsta.');
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

        $title = is_array($form->title)
            ? $form->title
            : (json_decode((string) $form->title, true) ?? ['lv' => (string) $form->title, 'en' => (string) $form->title]);

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
        ]);
    }

    public function showCode()
    {
        syncLangFiles('questions');

        return Inertia::render('Formas/questions', [
            'locale' => app()->getLocale(),
        ]);
    }

    public function storeAnswers(Request $request)
    {
        $data = $request->validate([
            'form_id' => 'nullable|integer',
            'code' => 'required|string',
            'title' => 'nullable',
            'answers' => 'required|array',
        ]);

        $title = $data['title'] ?? null;
        $formTypeString = null;

        if (isset($data['form_id'])) {
            try {
                $form = Form::find($data['form_id']);
                if ($form) {
                    if (is_array($form->title)) {
                        $locale = app()->getLocale();
                        $title = $form->title[$locale]
                            ?? $form->title['lv']
                            ?? $form->title['en']
                            ?? json_encode($form->title);
                    } else {
                        $title = (string) $form->title;
                    }

                    $formType = FormType::where('form_id', $form->id)->first();
                    if ($formType) {
                        $formTypeString = $formType->type;
                    }
                }
            } catch (\Exception $e) {
                Log::warning('Could not load Form by id in storeAnswers: ' . $e->getMessage());
            }
        }

        $title = $title ?? 'Submission';

        $result = FormResult::create([
            'code' => $data['code'],
            'title' => $title,
            'results' => [
                'answers' => $data['answers'],
                'submitted_at' => now()->toDateTimeString(),
                'form_id' => $data['form_id'] ?? null,
                'form_type' => $formTypeString,
            ],
        ]);

        Log::info('Anketa answers stored', [
            'form_result_id' => $result->id,
            'form_id' => $data['form_id'] ?? null,
            'code' => $data['code'],
            'form_type' => $formTypeString,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Answers stored.',
            'id' => $result->id,
        ]);
    }

    public function resultsIndex(Request $request)
    {
        $filters = $request->only([
            'type',
            'code',
            'from',
            'to',
            'search',
            'orderBy',
            'orderDir',
        ]);

        $query = FormResult::query();

        if (!empty($filters['type'])) {
            $type = $filters['type'];
            $query->where(function ($q) use ($type) {
                $q->where('results->form_type', $type)
                    ->orWhere('code', $type);
            });
        }

        if (!empty($filters['code'])) {
            $query->where('code', 'like', '%' . $filters['code'] . '%');
        }

        if (!empty($filters['from'])) {
            $query->whereDate('created_at', '>=', $filters['from']);
        }

        if (!empty($filters['to'])) {
            $query->whereDate('created_at', '<=', $filters['to']);
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', '%' . $search . '%')
                    ->orWhere('title', 'like', '%' . $search . '%');
            });
        }

        $allowedOrderBy = ['id', 'code', 'created_at'];
        $orderBy = in_array($filters['orderBy'] ?? '', $allowedOrderBy, true)
            ? $filters['orderBy']
            : 'created_at';

        $orderDir = in_array($filters['orderDir'] ?? '', ['asc', 'desc'], true)
            ? $filters['orderDir']
            : 'desc';

        $results = $query->orderBy($orderBy, $orderDir)->get();

        $formatted = $results->map(function (FormResult $r) {
            $res = $r->results ?? [];

            $answers = $res['answers'] ?? [];
            $answersCount = is_array($answers)
                ? count($answers)
                : 0;

            return [
                'id' => $r->id,
                'code' => $r->code,
                'title' => $r->title,
                'type' => $res['form_type'] ?? null,
                'submitted_at' => $res['submitted_at'] ?? $r->created_at?->toDateTimeString(),
                'answers_count' => $answersCount,
            ];
        });

        return Inertia::render('Admin/Anketa/resultsIndex', [
            'results' => $formatted,
            'filters' => [
                'type' => $filters['type'] ?? '',
                'code' => $filters['code'] ?? '',
                'from' => $filters['from'] ?? '',
                'to' => $filters['to'] ?? '',
                'search' => $filters['search'] ?? '',
                'orderBy' => $orderBy,
                'orderDir' => $orderDir,
            ],
        ]);
    }

    public function resultsShow($id)
    {
        $result = FormResult::findOrFail($id);
        $res = $result->results ?? [];

        // Get field mappings if form_id is available
        $fieldMappings = [];
        if (isset($res['form_id'])) {
            try {
                $form = Form::find($res['form_id']);
                if ($form) {
                    $schema = is_array($form->data) ? $form->data : json_decode($form->data ?? '{}', true);
                    $fields = $schema['fields'] ?? [];

                    $locale = app()->getLocale();

                    foreach ($fields as $field) {
                        $fieldId = $field['id'] ?? '';
                        if ($fieldId) {
                            $label = $field['label'][$locale]
                                ?? $field['label']['lv']
                                ?? $field['label']['en']
                                ?? $field['label']
                                ?? $fieldId;
                            $fieldMappings[$fieldId] = $label;
                        }
                    }
                }
            } catch (\Exception $e) {
                Log::warning('Could not load form fields for resultsShow: ' . $e->getMessage());
            }
        }

        $payload = [
            'id' => $result->id,
            'code' => $result->code,
            'title' => $result->title,
            'type' => $res['form_type'] ?? null,
            'submitted_at' => $res['submitted_at'] ?? $result->created_at?->toDateTimeString(),
            'answers' => $res['answers'] ?? [],
            'field_mappings' => $fieldMappings,
        ];

        return Inertia::render('Admin/Anketa/resultsShow', [
            'result' => $payload,
        ]);
    }
}

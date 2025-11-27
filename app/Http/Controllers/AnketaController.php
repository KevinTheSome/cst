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

        // dd($forms);
        $formData = $forms->map(function ($form) {
            return [
                'id' => $form->id,
                'code' => $form->code,
                'title' => $form->title,         // already array now
                'data' => [
                    'title' => $form->title,     // array
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
        $form = Form::findOrFail($id);

        // decode data if stored as JSON
        $data = $form->data ?? []; // already array
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
        return Inertia::render('Admin/Anketa/createAnketa');
    }

    /**
     * Admin: store form template
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $data = $request->validate([
            'title' => 'required',
            'visibility' => 'required|string',
            'schema.fields' => 'array|nullable',

            'schema.fields.*.label.lv' => 'required|string',
            'schema.fields.*.label.en' => 'required|string',
            'schema.fields.*.options.lv.*' => 'required|string',
            'schema.fields.*.options.en.*' => 'required|string',
        ]);
        Form::create([
            'code' => $data['visibility'],
            'title' => [
                'lv' => $data['title']['lv'] ?? $data['title'],
                'en' => $data['title']['en'] ?? $data['title'],
            ],
            'data' => [
                'title' => [
                    'lv' => $data['title']['lv'] ?? $data['title'],
                    'en' => $data['title']['en'] ?? $data['title'],
                ],
                'fields' => data_get($data, 'schema.fields', []),
            ],
        ]);
        return redirect()->route('admin.anketa');

    }

    /**
     * Admin: edit form template
     */
    public function edit($id)
    {
        $form = Form::findOrFail($id);

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'form' => $form
        ]);
    }


    /**
     * Admin: update form template
     */
    public function update(Request $request, $id)
    {
        $form = Form::findOrFail($id);

        $validated = $request->validate([
            'code' => 'required|string|in:public,private',
            'data' => 'required|array',
            'data.title' => 'required|array',
            'data.title.lv' => 'required|string|max:255',
            'data.title.en' => 'required|string|max:255',
            'data.fields' => 'required|array',
            'data.fields.*.id' => 'required|string',
            'data.fields.*.type' => 'required|string|in:text,radio,checkbox,dropdown,scale',
            'data.fields.*.label' => 'required|array',
            'data.fields.*.label.lv' => 'required|string|max:255',
            'data.fields.*.label.en' => 'required|string|max:255',
            // Options as arrays (lv/en)
            'data.fields.*.options' => 'nullable|array',
            'data.fields.*.options.lv' => 'nullable|array',
            'data.fields.*.options.lv.*' => 'sometimes|required|string|max:255',
            'data.fields.*.options.en' => 'nullable|array',
            'data.fields.*.options.en.*' => 'sometimes|required|string|max:255',
            // Placeholder
            'data.fields.*.placeholder' => 'nullable|array',
            'data.fields.*.placeholder.lv' => 'sometimes|string|nullable|max:255',
            'data.fields.*.placeholder.en' => 'sometimes|string|nullable|max:255',
            // Scale
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

        $form->update([
            'code' => $validated['code'],
            'title' => $validated['data']['title'],
            'data' => $validated['data'],
        ]);

        return response()->json([
            'message' => 'Form updated successfully',
            'form' => $form,
        ]);
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
     * Public route: load a form page by its code (used by your route closures)
     *
     * Example: app(AnketaController::class)->loadByCode('psoriasis')
     */
    public function loadByCode(string $code)
    {

        $formType = FormType::where('type', $code)->first();


        if (!$formType) {
            return Inertia::render('Formas/forma', [
                'form' => null,
            ]);
        }

        $form = $formType->form;

        // Send the form payload to the frontend anketa page
        return Inertia::render('Formas/forma', [
            'form' => $form,
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

        // Try to get the form title from form_id if provided
        $title = $data['title'] ?? null;
        if (isset($data['form_id'])) {
            try {
                $form = Form::find($data['form_id']);
                if ($form) {
                    $title = $form->title ?? $title;
                }
            } catch (\Exception $e) {
                // swallow - we'll just use provided title or fallback
                Log::warning('Could not load Form by id in storeAnswers: ' . $e->getMessage());
            }
        }

        // Create a new FormResult record
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

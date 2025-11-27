<?php

namespace App\Http\Controllers;

use App\Models\FormResult;
use App\Models\Form;
use App\Models\FormType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

        $schema = is_array($form->data)
            ? $form->data
            : json_decode($form->data ?? '{}', true);

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'formData' => [
                'id' => $form->id,
                'title' => $form->title,
                'code' => $form->code,
                'data' => $schema,
            ],
        ]);
    }



    /**
     * Admin: update form template
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        //dd(vars: $data);

        $formResult = Form::findOrFail($id);

        $formResult->update([
            'code' => $data['visibility'] ?? $formResult->code,
            'title' => $data['title'] ?? $formResult->title,
            'data' => $data['schema'] ?? $formResult->data,
        ]);

        return redirect()->route('admin.anketa');
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

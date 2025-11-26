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
     * Admin: list stored form results
     */
    public function index()
    {
        // Show stored submissions (form_results)
        $formResults = FormResult::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formResults' => $formResults,
        ]);
    }

    /**
     * Admin: show single stored result
     */
    public function show($id)
    {
        $formResult = FormResult::findOrFail($id);

        return Inertia::render('Admin/Anketa/showAnketa', [
            'formResult' => $formResult,
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
        $data = $request->validate([
            'title' => 'required',
            'visibility' => 'required|string',
            'schema.fields' => 'array|nullable',
        ]);

        Form::create([
            'code' => $data['visibility'],
            'title' => $data['title'],
            'results' => [
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
        $formResult = Form::findOrFail($id);

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'formResult' => $formResult,
        ]);
    }

    /**
     * Admin: update form template
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $formResult = Form::findOrFail($id);

        $formResult->update([
            'code' => $data['visibility'] ?? $formResult->code,
            'title' => $data['title'] ?? $formResult->title,
            'results' => $data['schema'] ?? $formResult->results,
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
        ]);

    }


    /**
     * Public: show the code entry page for forms
     */
    public function showCode()
    {
        return Inertia::render('Formas/questions');
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

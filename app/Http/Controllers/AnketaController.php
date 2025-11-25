<?php

namespace App\Http\Controllers;

use App\Models\FormResult;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnketaController extends Controller
{
    public function index()
    {
        $formResults = Form::all();

        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formResults' => $formResults,
        ]);
    }

    public function show($id)
    {
        $formResult = Form::findOrFail($id);

        return Inertia::render('Admin/Anketa/showAnketa', [
            'formResult' => $formResult,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Anketa/createAnketa');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'          => 'required',
            'visibility'     => 'required|string',
            'schema.fields'  => 'array|nullable',
        ]);

        Form::create([
            'code'    => $data['visibility'],
            'title'   => $data['title'],
            'results' => [
                'fields' => data_get($data, 'schema.fields', []),
            ],
        ]);

        return redirect()->route('admin.anketa');
    }

    public function edit($id)
    {
        $formResult = Form::findOrFail($id);

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'formResult' => $formResult,
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        $formResult = Form::findOrFail($id);

        $formResult->update([
            'code'    => $data['visibility'] ?? $formResult->code,
            'title'   => $data['title'] ?? $formResult->title,
            'results' => $data['schema'] ?? $formResult->results,
        ]);

        return redirect()->route('admin.anketa');
    }

    public function destroy($id)
    {
        $formResult = Form::findOrFail($id);
        $formResult->delete();

        return redirect()->route('admin.anketa');
    }

    public function storeAnswers(Request $request)
    {
        $data = $request->validate([
            'form_id' => 'nullable|integer',
            'code'    => 'required|string',
            'title'   => 'nullable|string',
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
                // swallow - we'll just use provided title or null
                Log::warning('Could not load Form by id in storeAnswers: ' . $e->getMessage());
            }
        }

        // create a new FormResult record
        $result = FormResult::create([
            'code'    => $data['code'],
            'title'   => $title ?? 'Submission',
            'results' => [
                'answers'   => $data['answers'],
                'submitted_at' => now()->toDateTimeString(),
            ],
        ]);

        Log::info('Anketa answers stored', [
            'form_result_id' => $result->id,
            'form_id' => $data['form_id'] ?? null,
            'code'    => $data['code'],
        ]);

        return response()->json([
            'ok'      => true,
            'message' => 'Answers stored.',
            'id'      => $result->id,
        ]);
    }
}

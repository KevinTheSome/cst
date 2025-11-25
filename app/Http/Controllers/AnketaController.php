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
            'code' => $data['visibility'] ?? $formResult->code,
            'title' => $data['title'] ?? $formResult->title,
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
        dd('Storing answers is not yet implemented.', $request->all());

        // $data = $request->validate([
        //     'form_id' => 'nullable|integer',
        //     'code' => 'required|string',
        //     'answers' => 'required|array',
        // ]);

        // Log::info('Anketa answers received', [
        //     'form_id' => $data['form_id'] ?? null,
        //     'code' => $data['code'],
        //     'answers' => $data['answers'],
        // ]);

        // return response()->json([
        //     'ok' => true,
        //     'message' => 'Answers stored (stub).',
        // ]);
    }

    public function showPublic()
    {
        return Inertia::render('Anketa/publicAnketa');
    }

    public function showSpecialist()
    {
        return Inertia::render('Anketa/specialistAnketa');
    }

    public function showPsoriaze()
    {
        return Inertia::render('Anketa/psoriazeAnketa');
    }

    public function showHroniskas()
    {
        return Inertia::render('Anketa/hroniskasAnketa');
    }

    public function loadByCode($code)
    {
        $formType = FormType::where('type', $code)
            ->with('form')
            ->first();


        if (!$formType || !$formType->form) {
            return Inertia::render('Formas/forma', [
                'form' => null,
                'error' => "Anketa ar kodu '{$code}' nav pieejama.",
            ]);
        }

        // Return normal page
        return Inertia::render('Formas/forma', [
            'form' => $formType->form,
            'error' => null,
        ]);
    }

}

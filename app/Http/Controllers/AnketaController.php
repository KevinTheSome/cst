<?php

namespace App\Http\Controllers;

use App\Models\FormResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnketaController extends Controller
{
    public function show()
    {
        $formResults = FormResult::all();
        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formResults' => $formResults,
        ]);
    }

    public function showAnketu($id)
    {
        $formResult = FormResult::findOrFail($id);
        //dd($formResult);
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
        $data = $request->all();

        FormResult::create([
            'code' => $data['visibility'],
            'title' => $data['title'],
            'results' => $data['schema'],
        ]);


    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\FormResult;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnketaController extends Controller
{
    /**
     * LIST PAGE – all forms
     * GET /admin/anketa   (route: admin.anketa)
     */
    public function index()
    {
        $formResults = FormResult::all();

        return Inertia::render('Admin/Anketa/indexAnketa', [
            'formResults' => $formResults,
        ]);
    }

    /**
     * SHOW SINGLE FORM – preview
     * GET /admin/anketa/show/{id}   (route: admin.anketa.show)
     */
    public function show($id)
    {
        $formResult = FormResult::findOrFail($id);

        return Inertia::render('Admin/Anketa/showAnketa', [
            'formResult' => $formResult,
        ]);
    }

    /**
     * CREATE PAGE
     * GET /admin/anketa/create   (route: admin.anketa.create)
     */
    public function create()
    {
        return Inertia::render('Admin/Anketa/createAnketa');
    }

    /**
     * STORE NEW FORM
     * POST /admin/anketa/store   (route: admin.anketa.store)
     */
    public function store(Request $request)
    {
        $data = $request;

        FormResult::create([
            'code' => $data['visibility'],
            'title' => $data['title'],
            'results' => [
                'fields' => $data['schema']['fields'] ?? [],
            ],
        ]);

        return redirect()->route('admin.anketa');
    }

    /**
     * EDIT PAGE
     * GET /admin/anketa/edit/{id}   (route: admin.anketa.edit)
     */
    public function edit($id)
    {
        $formResult = FormResult::findOrFail($id);

        return Inertia::render('Admin/Anketa/updateAnketa', [
            'formResult' => $formResult,
        ]);
    }

    /**
     * UPDATE FORM
     * PUT /admin/anketa/update/{id}   (route: admin.anketa.update)
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $formResult = FormResult::findOrFail($id);

        $formResult->update([
            'code' => $data['visibility'],
            'title' => $data['title'],
            'results' => $data['schema'],
        ]);

        return redirect()->route('admin.anketa');
    }

    /**
     * DELETE FORM
     * DELETE /admin/anketa/destroy/{id}   (route: admin.anketa.destroy)
     */
    public function destroy($id)
    {
        $formResult = FormResult::findOrFail($id);
        $formResult->delete();

        return redirect()->route('admin.anketa');
    }
}

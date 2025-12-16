<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormType;
use App\Models\Form;
use Inertia\Inertia;

class FormTypeController extends Controller
{
    public function index(){
        syncLangFiles('anketa');
        $anketas = Form::where('code', 'public')->get();
        $formTypes = FormType::all();
        return Inertia::render('Admin/Anketa/selectorAnketa', ['anketas' => $anketas, 'formTypes' => $formTypes, 'locale' => app()->getLocale()]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'type' => 'required|in:specialists,psoriasis,chronic',
        ]);

        // 1. Remove this form from any OTHER type
        FormType::where('form_id', $validated['form_id'])
            ->where('type', '!=', $validated['type'])
            ->delete();

        // 2. Ensure only one form per type
        FormType::updateOrCreate(
            ['type' => $validated['type']],
            ['form_id' => $validated['form_id']]
        );

        return back();
    }

}

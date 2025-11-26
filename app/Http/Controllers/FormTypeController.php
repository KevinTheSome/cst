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
        $anketas = Form::all();
        $formTypes = FormType::all();
        return Inertia::render('Admin/Anketa/selectorAnketa', ['anketas' => $anketas, 'formTypes' => $formTypes, 'locale' => app()->getLocale()]);
    }
    public function add(Request $request){
        $validated = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'type' => 'required|in:specialists,psoriasis,chronic',
        ]);
        $form = FormType::where('form_id', $validated['form_id'])->first();

        $type_exists = FormType::where('type', $validated['type'])->exists();
        if($type_exists){
            $form = FormType::where('type', $validated['type'])->first();
            $form->delete();
        }

        $exists = FormType::where('form_id', $validated['form_id'])->exists();
        if($exists){
            $form['type'] = $validated['type'];
            $form->save();
        }
        else {
            FormType::create([
                'form_id' => $validated['form_id'],
                'type' => $validated['type'],
            ]);
        }
        return back();
    }
}

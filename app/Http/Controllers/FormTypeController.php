<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormType;
use App\Models\Form;
use Inertia\Inertia;

class FormTypeController extends Controller
{
    public function index()
    {
        // If you need this, keep it; otherwise it can cause side effects.
        // syncLangFiles('anketa');

        $anketas = Form::where('code', 'public')
            ->get()
            ->map(fn ($f) => [
                'id' => $f->id,
                'code' => $f->code,
                'title' => is_array($f->title) ? $f->title : (array) $f->title,
            ])
            ->values();

        $formTypes = FormType::query()
            ->get()
            ->map(fn ($ft) => [
                'id' => $ft->id,
                'form_id' => (int) $ft->form_id,
                'type' => $ft->type,
            ])
            ->values();

        return Inertia::render('Admin/Anketa/selectorAnketa', [
            'anketas' => $anketas,
            'formTypes' => $formTypes,
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'form_id' => 'required|exists:forms,id',
            'type' => 'required|in:specialists,psoriasis,chronic',
        ]);

        // Remove this form from any other type
        FormType::where('form_id', $validated['form_id'])
            ->where('type', '!=', $validated['type'])
            ->delete();

        // Ensure only one form per type
        FormType::updateOrCreate(
            ['type' => $validated['type']],
            ['form_id' => $validated['form_id']]
        );

        return back();
    }
}

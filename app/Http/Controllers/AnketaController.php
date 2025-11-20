<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AnketaController extends Controller
{
    public function index()
    {
        //
    }
    public function create()
    {
        return view('Admin/Anketa/createAnketa');
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
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

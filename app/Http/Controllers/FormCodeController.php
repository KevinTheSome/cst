<?php

namespace App\Http\Controllers;

use App\Models\FormCode;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class FormCodeController extends Controller
{
    public function index()
    {
        return inertia('Admin/formCodes', [
            'codes' => FormCode::orderBy('created_at', 'desc')->get()
        ]);
    }

  public function store(Request $request): JsonResponse
{
    $request->validate([
        'uses' => 'required|integer|min:1',
        'expiration_hours' => 'required|integer|min:1',
    ]);

    $expiration = now()->addHours($request->expiration_hours);

    $code = FormCode::create([
        'code' => strtoupper(Str::random(12)),
        'user_created' => auth()->id() ?? 0,
        'expiration_date' => $expiration,
        'uses' => $request->uses,
    ]);

    return response()->json([
        'success' => true,
        'code' => $code,  
    ]);
}


}

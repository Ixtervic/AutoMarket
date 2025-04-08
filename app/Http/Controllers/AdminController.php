<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Verificamos si el usuario autenticado es admin
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => User::select()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        // Autorización y validación
        Gate::authorize('update', $user);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            // Agrega validaciones adicionales si es necesario
        ]);

        $user->update($validated);

        return redirect(route('admin.users.index'))->with('success', 'Usuario actualizado correctamente');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): RedirectResponse
    {
        if ($user) {
            
            $user->delete();
            return redirect()->back();
            // return redirect()->back()->with('success', 'Usuario eliminado correctamente');
        }

        return redirect(route('AdminUsers.index'))->with('success', 'Usuario eliminado correctamente');
    }


}

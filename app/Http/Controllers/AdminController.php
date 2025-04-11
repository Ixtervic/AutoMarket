<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Exception;
use Illuminate\Support\Facades\Log;
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
        // Verificamos si el usuario autenticado es admin
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }
        return Inertia::render('Admin/Users/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'is_admin' => $request->boolean('is_admin'),
            ]);

            return redirect()->route('AdminUsers.index')->with('success', 'Usuario creado correctamente.');
        } catch (Exception $e) {
            Log::error('Error al crear usuario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Hubo un error al crear el usuario.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        // Verificamos si el usuario autenticado es admin
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }
        return Inertia::render('Admin/Users/create', ['user' => $user, 'isView' => true]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        // Verificamos si el usuario autenticado es admin
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }
        return Inertia::render('Admin/Users/create', ['user' => $user, 'isEdit' => true]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        if (Auth::user()->is_admin != 1) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        try {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'is_admin' => $request->is_admin,
                // Solo actualiza contraseña si fue enviada
                'password' => $request->filled('password') ? bcrypt($request->password) : $user->password,
            ]);

            return redirect()->route('AdminUsers.index')->with('success', 'Usuario actualizado correctamente.');
        } catch (Exception $e) {
            Log::error('Error al actualizar usuario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Hubo un error al actualizar el usuario.');
        }
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

        return redirect(route('AdminUsers.index'))->with('success', 'No se encuentra el usuario a eliminar');
    }


}

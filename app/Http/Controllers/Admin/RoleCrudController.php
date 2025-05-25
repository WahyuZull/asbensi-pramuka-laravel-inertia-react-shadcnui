<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $roleQuery = \App\Models\Role::query();
        $roleQuery->when($request->search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search . '%');
        });

        $roles = $roleQuery->paginate(20);
        return Inertia::render('admin/roles/index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/roles/manage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ], [
            'name.required' => 'Name is required'
        ]);

        \App\Models\Role::create($request->only('name'));

        session()->flash('success', 'Role created successfully');
        return redirect()->route('dashboard.roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = \App\Models\Role::findOrFail($id);
        return Inertia::render('admin/roles/manage', [
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = \App\Models\Role::findOrFail($id);
        $role->update($request->only('name'));

        session()->flash('success', 'Role updated successfully');
        return redirect()->route('dashboard.roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = \App\Models\Role::findOrFail($id);
        $role->delete();

        session()->flash('success', 'Role deleted successfully');
        return redirect()->route('dashboard.roles.index');
    }
}

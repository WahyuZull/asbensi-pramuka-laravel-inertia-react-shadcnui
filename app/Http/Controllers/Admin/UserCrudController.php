<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userQuery = \App\Models\User::query();
        $userQuery->when($request->search, function ($query, $search) {
            return $query->where('name', 'like', '%' . $search . '%');
        });

        $users = $userQuery->with('roles')->paginate(20);
        return Inertia::render('admin/users/index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = \App\Models\Role::all();
        return Inertia::render('admin/users/manage', [
            'roles' => $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
            'roles' => 'required|array'
        ], [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email is invalid',
            'email.unique' => 'Email is already taken',
            'password.required' => 'Password is required',
            'password_confirmation.required' => 'Confirm password is required',
            'password_confirmation.same' => 'Password and confirm password should be same',
            'roles.required' => 'Role is required'
        ]);

        $user = \App\Models\User::create(array_merge($request->only('name', 'email', 'password'), [
            'password' => bcrypt($request->password)
        ]));

        $user->syncRoles($request->roles);

        // $user->detail()->create();

        session()->flash('success', 'User created successfully');
        return redirect()->route('dashboard.users.index');
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
        $user = \App\Models\User::with('roles')->findOrFail($id);
        $roles = \App\Models\Role::all();
        return Inertia::render('admin/users/manage', [
            'user' => $user,
            'roles' => $roles
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'password' => 'nullable|min:8',
            'password_confirmation' => 'nullable|min:8|same:password'
        ], [
            'name.required' => 'Name is required',
            'password.min' => 'Password must be 8 character',
            'password_confirmation.min' => 'Password Confirmation must be 8 character',
            'password_confirmation.same' => 'Password Confirmation must same with password',
        ]);

        $user = \App\Models\User::findOrFail($id);
        $password = $user->password;
        if ($request->password) {
            $password = bcrypt($request->password);
        }

        $user->fill(array_merge($request->only('name'), ['password' => bcrypt($password)]));
        $user->save();

        $user->syncRoles($request->roles);

        session()->flash('success', 'User has been updated successfully');
        return redirect()->route('dashboard.users.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = \App\Models\User::findOrFail($id);
        $user->delete();

        session()->flash('success', 'User deleted successfully');
        return redirect()->route('dashboard.users.index');
    }
}

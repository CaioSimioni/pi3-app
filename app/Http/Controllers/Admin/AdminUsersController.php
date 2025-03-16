<?php
namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
    public function users(): Response
    {
        $users = User::all(); 
        return Inertia::render('admin/users', [
            'users' => $users, 
        ]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:adm,aux,enf,med,far,chf',
        ]);

        User::create($validated);

        return redirect()->route('admin.users');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|string|min:8|confirmed',
            'role' => 'sometimes|in:adm,aux,enf,med,far,chf',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users');
    }
}

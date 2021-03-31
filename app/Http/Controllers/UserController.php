<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(Request $request) {

        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);

        $validated['password'] = bcrypt($request['password']);

        $user = User::create($validated);

        return response()->json(['data' => $user], 201);

    }

    public function login(Request $request) {

        $validated = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        if(!Auth::attempt($validated)) {
            return response()->json(['message' => 'Invalid Credentials'], 401);
        }

        $user = Auth::user();
        $accessToken = Auth::user()->createToken('access_token')->accessToken;

        return response()->json([
            'user' => $user,
            'access_token' => $accessToken
        ]);
    }

    public function getCurrentUser() {
        $user = Auth::user();

        return response()->json(['user' => $user], 200);
    }
}

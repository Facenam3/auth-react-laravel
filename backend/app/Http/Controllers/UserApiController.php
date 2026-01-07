<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    public function store(UserRequest $userRequest)  {
        $user = User::create([
            "name" => $userRequest->name,
            "email" => $userRequest->email,
            "password" => Hash::make($userRequest->password),
            "country" => $userRequest->country,
            "adress" => $userRequest->adress,
            "phone" => $userRequest->phone,
            "gender" => $userRequest->gender,
        ]);

        return response()->json(data: [
            "user" => $user,
             "message" => "User created succesfully!"
        ], status: 201);
    }

    public function editUser(UserRequest $userRequest, $id) {
        $user = User::findOrFail($id);

        $user->update([
            "name" => $userRequest->name,
            'email' => $userRequest->email,
            "password" => Hash::make($userRequest->password),
            "country" => $userRequest->country,
            "adress" => $userRequest->adress,
            "phone" => $userRequest->phone,
            "gender" => $userRequest->gender
        ]);

        return response()->json(data: [
            "user" => $user,
            "message" => "Successfully updated user",
        ], status: 204);
    }

    public function login(UserLoginRequest $request) {
        if(!Auth::attempt($request->only("email" , "password"))) {
            return response()->json(["message" => "Invalid credentials"], status: 401);

            $request->session()->regenerate();

            return response()->json(["user" => Auth::user()]);
        }
    }
}

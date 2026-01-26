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
            "role" => "user",
            "gender" => $userRequest->gender,
        ]);

        return response()->json(data: [
            "user" => $user,
             "message" => "User created succesfully!"
        ], status: 201);
    }

    public function showUser($id) {
        $user = User::findOrFail($id);

        return response()->json(data: [
            "user" => $user,
            "message" => "Succesfully showing the user in user Profile"
        ]);
    }

    public function getAllUsers() {
        $users = User::paginate(10);

        return response()->json([
            "users" => $users,
            "message" => "Successfully showing 10 users."
        ], 200);
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
        ], status: 201);
    }

    public function login(UserLoginRequest $request) {
        try {
           if(!Auth::attempt($request->only("email" , "password"))) {
            return response()->json(["message" => "Invalid credentials"], status: 401);
          }

            $user = Auth::user();            
            $user->tokens()->delete();
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                "user" => Auth::user(),
                "token" => $token,
                "role" => $user->role, 
                "message" => "Successfully logged in!"
                ], 200
            );       
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
         
    }

    public function logout(Request $request) {
        $token = $request->user()->currentAccessToken();

        if($token) {
            $token->delete();
        }

        return response()->json([
            "messsage" => "Succusfully logged out"
        ], 200);
    }
}

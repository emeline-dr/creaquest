<?php

namespace App\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use App\Models\User;
use App\Models\Model;

class UserController extends Controller
{
    public function index()
    {
        $user = new User($this->getDB());
        $users = $user->all();

        echo json_encode($users);
    }

    /* Traite les données pour la connexion */
    public function loginPost()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $user = (new User($this->getDB()))->getUsername($data['username']);

        if ($user && password_verify($data['password'], $user->u_password)) {
            $payload = [
                "iss" => "localhost",
                "aud" => "localhost",
                "iat" => time(),
                "exp" => time() + (30 * 24 * 60 * 60),
                "user_id" => $user->u_id
            ];

            $jwt = JWT::encode($payload, "token", 'HS256');

            echo json_encode(["status" => "success", "token" => $jwt]);
        } else {
            echo json_encode(["status" => "error", "message" => "Identifiants incorrects."]);
        }
    }
}

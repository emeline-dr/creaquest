<?php

namespace App\Controllers;

use Firebase\JWT\JWT;

use App\Models\User;

class UserController extends Controller
{
    /* Récupération de tous les utilisateurs */
    public function getAllUsers()
    {
        $result = (new User($this->getDB()))->getUsers();

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Utilisateurs non trouvés"]);
        }
    }

    /* Traite les données pour récupérer les informations de l'utilisateur connecté */
    public function getUser(int $id)
    {
        $result = (new User($this->getDB()))->getInfos($id);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Utilisateur non trouvé"]);
        }
    }

    /* Traite les données pour l'inscription */
    public function loginRegister()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $post = new User($this->getDB());
        $result = $post->addUser($data);

        if ($result) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error"]);
        }
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
                "user_id" => $user->u_id,
                "role" => $user->u_role
            ];

            $jwt = JWT::encode($payload, "token", 'HS256');

            $_SESSION['auth'] = $user->u_role;
            $_SESSION['username'] = $user->u_username;
            $_SESSION['password'] = $user->u_password;
            $_SESSION['email'] = $user->u_email;
            $_SESSION['avatar'] = $user->u_avatar;
            $_SESSION['id'] = $user->u_id;

            echo json_encode(["status" => "success", "token" => $jwt]);
        } else {
            echo json_encode(["status" => "error", "message" => "Identifiants incorrects."]);
        }
    }

    /* Update les informations du profil en vérifiant si co' */
    public function updateUser(int $id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        $userModel = new User($this->getDB());

        $result = $userModel->updateUser($id, $data);

        if ($result) {
            echo json_encode(["status" => "success", "message" => "Utilisateur mis à jour."]);
        } else {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Aucune donnée valide à mettre à jour."]);
        }
    }

    /* Supprimer un utilisateur */
    public function deleteUser(int $id)
    {
        $userModel = new User($this->getDB());

        $deleted = $userModel->deleteUser($id);

        if ($deleted) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Suppression échouée"]);
        }
    }
}

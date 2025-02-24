<?php

namespace App\Controllers;

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
}

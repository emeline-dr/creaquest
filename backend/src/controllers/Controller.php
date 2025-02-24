<?php

namespace App\Controllers;

use Database\DBConnexion;

abstract class Controller
{
    /* Permet la connexion pour tout Controller héritant de Controller.php */
    public function __construct(
        protected DBConnexion $db
    ) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /* Permet de récupérer la connexion à la DB */
    protected function getDB(): DBConnexion
    {
        return $this->db;
    }
}

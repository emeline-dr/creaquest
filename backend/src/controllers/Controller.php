<?php

namespace App\Controllers;

use Database\DBConnexion;

abstract class Controller
{
    public function __construct(
        protected DBConnexion $db
    ) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    protected function getDB(): DBConnexion
    {
        return $this->db;
    }
}

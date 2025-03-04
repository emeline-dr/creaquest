<?php

namespace App\Models;

class User extends Model
{
    protected $table = 'users';

    /* Récupération de l'username - fonction : login */
    public function getUsername(string $username): ?User
    {
        $result = $this->query("SELECT * FROM {$this->table} WHERE u_username = ?", [$username], true);

        if ($result) {
            return $result;
        }
        return null;
    }
}

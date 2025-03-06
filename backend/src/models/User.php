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

    /* Ajout d'un user - fonction : register */
    public function addUser(array $data)
    {
        if ($data['password'] === $data['passwordBis']) {
            $firstParenthesis = "";
            $secondParenthesis = "";
            $i = 1;

            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);

            // Filtrer les données pour exclure 'passwordBis'
            $filteredData = array_filter($data, function ($key) {
                return $key !== 'passwordBis';
            }, ARRAY_FILTER_USE_KEY);

            $filteredDataCount = count($filteredData);

            foreach ($filteredData as $key => $value) {
                $comma = $i === $filteredDataCount ? "" : ", ";
                $firstParenthesis .= "u_{$key}{$comma}";
                $secondParenthesis .= ":{$key}{$comma}";
                $i++;
            }

            return $this->query("INSERT INTO {$this->table} ($firstParenthesis, u_registered_at) VALUES ($secondParenthesis, CURDATE())", $filteredData);
        }

        return false;
    }
}

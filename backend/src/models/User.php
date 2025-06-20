<?php

namespace App\Models;

class User extends Model
{
    protected $table = 'users';

    /* Récupération de tous les utilisateur - fonction getAllUsers */
    public function getUsers()
    {
        $result = $this->query("SELECT * FROM {$this->table}");

        if ($result) {
            return $result;
        }

        return null;
    }

    /* Récupération de l'username - fonction : getUser */
    public function getInfos(int $id): ?User
    {
        $result = $this->query("SELECT * FROM {$this->table} WHERE u_id = ?", [$id], true);

        if ($result) {
            $taskModel = new Task($this->db);
            $completedByType = $taskModel->getCompletedTaskCountByType($id);

            $result->completed_tasks_total = array_sum($completedByType);
            $result->completed_tasks_detail = $completedByType;

            return $result;
        }
        return null;
    }

    /* Récupération de l'username - fonction : loginPost */
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

    /* Update du profil - tous les champs ne sont pas obligatoires */
    public function updateUser(int $id, array $data): bool
    {
        $allowedFields = [
            'username',
            'email',
            'avatar',
            'password'
        ];

        $setParts = [];
        $params = [];

        foreach ($data as $key => $value) {
            if (!in_array($key, $allowedFields)) {
                continue;
            }

            if ($value === null || $value === '') {
                continue;
            }

            if ($key === 'password') {
                $value = password_hash($value, PASSWORD_DEFAULT);
            }

            $column = "u_" . $key;
            $setParts[] = "$column = :$key";
            $params[$key] = $value;
        }

        // Si aucun champ à mettre à jour, retourner false
        if (empty($setParts)) {
            return false;
        }

        $sql = "UPDATE {$this->table} SET " . implode(', ', $setParts) . " WHERE u_id = :id";
        $params['id'] = $id;

        return $this->query($sql, $params);
    }

    /* Suppression d'un utilisateur */
    public function deleteUser($userId)
    {
        $sql = "DELETE FROM {$this->table} WHERE u_id = ?";
        return $this->query($sql, [$userId]);
    }


    /* Ajout de l'expérience à l'utilisateur */
    public function addExpToUser($userId, $exp)
    {
        $sql = "UPDATE {$this->table} SET u_exp = u_exp + ? WHERE u_id = ?";
        $this->query($sql, [$exp, $userId]);

        $sql = "SELECT u_exp FROM {$this->table} WHERE u_id = ?";
        $result = $this->query($sql, [$userId]);
        $expTotal = $result[0]->u_exp ?? 0;

        // Si l'expérience est supérieure ou égale à 100, on ajoute un niveau
        while ($expTotal >= 100) {
            $sql = "UPDATE {$this->table} SET u_exp = u_exp - 100 WHERE u_id = ?";
            $this->query($sql, [$userId]);

            $this->addLvlToUser($userId);

            $expTotal -= 100;
        }

        return true;
    }

    /* Ajout d'un niveau si 100 ou + */
    public function addLvlToUser($userId)
    {
        $sql = "UPDATE {$this->table} SET u_lvl = u_lvl + 1 WHERE u_id = ?";

        return $this->query($sql, [$userId]);
    }
}

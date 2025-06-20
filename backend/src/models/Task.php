<?php

namespace App\Models;

class Task extends Model
{
    public function getAllTasks(): array
    {
        $taskTables = [
            'writing' => ['w_id', 'w_name', 'w_description', 'w_exp'],
            'reading' => ['r_id', 'r_name', 'r_description', 'r_exp'],
            'drawing' => ['d_id', 'd_name', 'd_description', 'd_exp']
        ];

        $allTasks = [];

        foreach ($taskTables as $type => $fields) {
            $fieldList = implode(', ', $fields);
            $sql = "SELECT '$type' as type, $fieldList FROM $type";
            $results = $this->query($sql);

            foreach ($results as $task) {
                $task->type = $type;
                $allTasks[] = $task;
            }
        }

        return $allTasks;
    }

    public function getTask($userId, $taskType, $status)
    {
        $tables = [
            'writing' => ['w', 'w_id', 'users_writing', 'users_writing_w_id', 'users_writing_u_id'],
            'reading' => ['r', 'r_id', 'users_reading', 'users_reading_r_id', 'users_reading_u_id'],
            'drawing' => ['d', 'd_id', 'users_drawing', 'users_drawing_d_id', 'users_drawing_u_id']
        ];

        [$alias, $id, $userTable, $userTaskId, $userIdField] = $tables[$taskType];

        $taskStatus = [
            'completed' => "
                SELECT $alias.*
                FROM $taskType $alias
                INNER JOIN $userTable ut 
                ON $alias.$id = ut.$userTaskId 
                WHERE ut.$userIdField = ?;
            ",
            'uncompleted' => "
                SELECT $alias.*
                FROM $taskType $alias
                LEFT JOIN $userTable ut ON $alias.$id = ut.$userTaskId
                AND ut.$userIdField = ?
                WHERE ut.$userTaskId IS NULL;
            "
        ];

        return $this->query($taskStatus[$status], [$userId]);
    }

    public function getCompletedTaskCountByType($userId): array
    {
        $tables = [
            'writing' => ['users_writing', 'users_writing_u_id'],
            'reading' => ['users_reading', 'users_reading_u_id'],
            'drawing' => ['users_drawing', 'users_drawing_u_id']
        ];

        $counts = [];

        foreach ($tables as $type => [$table, $userField]) {
            $sql = "SELECT COUNT(*) as count FROM $table WHERE $userField = ?";
            $result = $this->query($sql, [$userId], true);
            $counts[$type] = (int) ($result->count ?? 0);
        }

        return $counts;
    }

    public function validateTask($userId, $taskType, $taskId)
    {
        $tables = [
            'writing' => ['users_writing', 'users_writing_w_id', 'users_writing_u_id'],
            'reading' => ['users_reading', 'users_reading_r_id', 'users_reading_u_id'],
            'drawing' => ['users_drawing', 'users_drawing_d_id', 'users_drawing_u_id']
        ];

        [$userTable, $taskField, $userField] = $tables[$taskType];

        $sql = "INSERT INTO $userTable ($taskField, $userField) VALUES (?, ?)";

        return $this->query($sql, [$taskId, $userId]);
    }

    public function getGlobalCompletedTaskCountByType(): array
    {
        $tables = [
            'writing' => 'users_writing',
            'reading' => 'users_reading',
            'drawing' => 'users_drawing'
        ];

        $counts = [];

        foreach ($tables as $type => $table) {
            $sql = "SELECT COUNT(*) as count FROM $table";
            $result = $this->query($sql, [], true);
            $counts[$type] = (int) ($result->count ?? 0);
        }

        return $counts;
    }

    public function getTotalGlobalCompletedTasks(): int
    {
        $counts = $this->getGlobalCompletedTaskCountByType();
        return array_sum($counts);
    }

    public function getTaskExp($taskId, $taskType)
    {
        $tables = [
            'writing' => ['writing', 'w_id', 'w_exp'],
            'reading' => ['reading', 'r_id', 'r_exp'],
            'drawing' => ['drawing', 'd_id', 'd_exp']
        ];

        [$table, $taskField, $expField] = $tables[$taskType];

        $sql = "SELECT $expField FROM $table WHERE $taskField = ?";

        $result = $this->query($sql, [$taskId], true);

        return $result->$expField ?? 0;
    }

    public function createTask($taskType, $title, $description, $exp)
    {
        $tables = [
            'writing' => ['writing', 'w_name', 'w_description', 'w_exp'],
            'reading' => ['reading', 'r_name', 'r_description', 'r_exp'],
            'drawing' => ['drawing', 'd_name', 'd_description', 'd_exp']
        ];

        if (!isset($tables[$taskType])) {
            throw new \Exception("Type de tâche invalide");
        }

        [$table, $titleField, $descField, $expField] = $tables[$taskType];

        $sql = "INSERT INTO $table ($titleField, $descField, $expField) VALUES (?, ?, ?)";

        return $this->query($sql, [$title, $description, $exp]);
    }

    public function updateTaskById($taskType, $taskId, array $data)
    {
        $tables = [
            'writing' => ['writing', 'w_id', ['w_name', 'w_description', 'w_exp']],
            'reading' => ['reading', 'r_id', ['r_name', 'r_description', 'r_exp']],
            'drawing' => ['drawing', 'd_id', ['d_name', 'd_description', 'd_exp']],
        ];

        if (!isset($tables[$taskType])) {
            throw new \Exception("Type de tâche invalide");
        }

        [$table, $idField, $fields] = $tables[$taskType];

        $setParts = [];
        $params = [];

        foreach ($fields as $field) {
            $jsonKey = explode('_', $field, 2)[1];
            if (isset($data[$jsonKey])) {
                $setParts[] = "$field = ?";
                $params[] = $data[$jsonKey];
            }
        }

        if (empty($setParts)) {
            return false;
        }

        $params[] = $taskId;
        $sql = "UPDATE $table SET " . implode(', ', $setParts) . " WHERE $idField = ?";

        return $this->query($sql, $params);
    }

    public function deleteTaskById($taskType, $taskId)
    {
        $tables = [
            'writing' => ['writing', 'w_id'],
            'reading' => ['reading', 'r_id'],
            'drawing' => ['drawing', 'd_id'],
        ];

        if (!isset($tables[$taskType])) {
            throw new \Exception("Type de tâche invalide");
        }

        [$table, $idField] = $tables[$taskType];

        $sql = "DELETE FROM $table WHERE $idField = ?";
        return $this->query($sql, [$taskId]);
    }
}

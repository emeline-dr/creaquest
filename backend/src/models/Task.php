<?php

namespace App\Models;

class Task extends Model
{
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
}

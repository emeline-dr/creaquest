<?php

namespace App\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    /* Récupérer les tâches d'écriture par User */
    public function getCompletedWritingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'writing', 'completed');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }
    public function getWritingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'writing', 'uncompleted');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Récupérer les tâches de lecture par User */
    public function getCompletedReadingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'reading', 'completed');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    public function getReadingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'reading', 'uncompleted');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Récupérer les tâches de dessin par User */
    public function getCompletedDrawingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'drawing', 'completed');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    public function getDrawingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getTask($userId, 'drawing', 'uncompleted');

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }
}

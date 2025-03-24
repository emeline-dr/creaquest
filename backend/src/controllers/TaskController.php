<?php

namespace App\Controllers;

use App\Models\Task;

class TaskController extends Controller
{
    /* Récupérer les tâches d'écriture par User */
    public function getWritingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getWritingTask($userId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Récupérer les tâches de lecture par User */
    public function getReadingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getReadingTask($userId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Récupérer les tâches de dessin par User */
    public function getDrawingTasks($userId)
    {
        $taskModel = new Task($this->getDB());
        $result = $taskModel->getDrawingTask($userId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }
}

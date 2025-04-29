<?php

namespace App\Controllers;

use App\Models\Task;
use App\Models\User;

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

    /* Valider une tâche de la table d'écriture */
    public function validateWritingTask($userId, $taskId)
    {
        $taskModel = new Task($this->getDB());

        /* Ajout de l'expérience à l'utilisateur */
        $exp = $taskModel->getTaskExp($taskId, 'writing');
        $exp = is_numeric($exp) ? (int)$exp : 0;

        $userModel = new User($this->getDB());
        $expAdded = $userModel->addExpToUser($userId, $exp);
        if (!$expAdded) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout de l'expérience à l'utilisateur"]);
            return;
        }

        /* Validation de la tâche */
        $result = $taskModel->validateTask($userId, 'writing', $taskId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Valider une tâche de la table de lecture */
    public function validateReadingTask($userId, $taskId)
    {
        $taskModel = new Task($this->getDB());

        /* Ajout de l'expérience à l'utilisateur */
        $exp = $taskModel->getTaskExp($taskId, 'reading');

        $userModel = new User($this->getDB());
        $expAdded = $userModel->addExpToUser($userId, $exp);
        if (!$expAdded) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout de l'expérience à l'utilisateur"]);
            return;
        }

        /* Validation de la tâche */
        $result = $taskModel->validateTask($userId, 'reading', $taskId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }

    /* Valider une tâche de la table de dessin */
    public function validateDrawingTask($userId, $taskId)
    {
        $taskModel = new Task($this->getDB());

        /* Ajout de l'expérience à l'utilisateur */
        $exp = $taskModel->getTaskExp($taskId, 'drawing');

        $userModel = new User($this->getDB());
        $expAdded = $userModel->addExpToUser($userId, $exp);
        if (!$expAdded) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout de l'expérience à l'utilisateur"]);
            return;
        }

        /* Validation de la tâche */
        $result = $taskModel->validateTask($userId, 'drawing', $taskId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Tâches non trouvées"]);
        }
    }
}

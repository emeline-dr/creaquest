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

    /* Récupération des tâches complétées par type + total */
    public function getAllCompletedTasks()
    {
        $taskModel = new Task($this->getDB());
        $countsByType = $taskModel->getGlobalCompletedTaskCountByType();
        $total = $taskModel->getTotalGlobalCompletedTasks();

        $response = [
            'completed_by_type' => $countsByType,
            'total_completed' => $total
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    /* Créer une nouvelle tâche */
    public function createTask()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['taskType'], $data['title'], $data['description'], $data['exp'])) {
            http_response_code(400);
            echo json_encode(["error" => "Champs manquants"]);
            return;
        }

        $taskModel = new Task($this->getDB());

        try {
            $result = $taskModel->createTask(
                $data['taskType'],
                $data['title'],
                $data['description'],
                (int) $data['exp']
            );

            if ($result) {
                http_response_code(201);
                echo json_encode(["success" => true]);
            } else {
                throw new \Exception("Erreur lors de la création");
            }
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }

    /* Modifier une tâche existante */
    public function updateTask($type, $id)
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!in_array($type, ['writing', 'reading', 'drawing'])) {
            http_response_code(400);
            echo json_encode(["error" => "Type de tâche invalide"]);
            return;
        }

        $taskModel = new Task($this->getDB());
        $updated = $taskModel->updateTaskById($type, $id, $data);

        if ($updated) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Erreur dans la modification de la tâche"]);
        }
    }

    /* Supprimer une tâche */
    public function deleteTask($type, $id)
    {
        $taskModel = new Task($this->getDB());

        if (!in_array($type, ['writing', 'reading', 'drawing'])) {
            http_response_code(400);
            echo json_encode(["error" => "Type de tâche invalide"]);
            return;
        }

        $deleted = $taskModel->deleteTaskById($type, $id);

        if ($deleted) {
            echo json_encode(["success" => true]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Suppression échouée"]);
        }
    }
}

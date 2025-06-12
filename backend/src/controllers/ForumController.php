<?php

namespace App\Controllers;

use App\Models\Forum;

class ForumController extends Controller
{
    /* Récupérer les catégories */
    public function getAllCategories(): void
    {
        $forumModel = new Forum($this->getDB());
        $result = $forumModel->getCategories();

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Catégories non trouvées"]);
        }
    }

    public function getAllSubjects(): void
    {
        $forumModel = new Forum($this->getDB());
        $result = $forumModel->getSubjects();

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Sujets non trouvés"]);
        }
    }

    public function getSubjectsByCategory($categoryId)
    {
        $forumModel = new Forum($this->getDB());
        $result = $forumModel->getSubjectsByCategoriesId($categoryId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Aucun sujet trouvé pour cette catégorie"]);
        }
    }

    public function createSubjectWithPost()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);

        if (!$inputData) {
            http_response_code(400);
            echo json_encode(["error" => "Requête invalide."]);
            return;
        }

        $categoryId = isset($inputData['categoryId']) ? (int) $inputData['categoryId'] : null;
        $title = isset($inputData['title']) ? $inputData['title'] : '';
        $content = isset($inputData['content']) ? $inputData['content'] : '';
        $authorId = isset($inputData['authorId']) ? (int) $inputData['authorId'] : null;

        if ($categoryId && $title && $content && $authorId) {
            $forumModel = new Forum($this->getDB());
            $subjectId = $forumModel->createSubjectWithPost($categoryId, $title, $content, $authorId);

            if ($subjectId) {
                http_response_code(201);
                echo json_encode(["message" => "Sujet et premier post créés avec succès.", "subjectId" => $subjectId]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Erreur lors de la création du sujet et du post."]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Données manquantes."]);
        }
    }


    public function getAllPosts(): void
    {
        $forumModel = new Forum($this->getDB());
        $result = $forumModel->getPosts();

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Posts non trouvés"]);
        }
    }

    public function getAllPostsBySubject($subjectId)
    {
        $forumModel = new Forum($this->getDB());
        $result = $forumModel->getPostsBySubject($subjectId);

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Posts de ce sujet non trouvés"]);
        }
    }

    public function addPost()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);

        if (!$inputData) {
            http_response_code(400);
            echo json_encode(["error" => "Requête invalide."]);
            return;
        }

        $subjectId = isset($inputData['subjectId']) ? (int) $inputData['subjectId'] : null;
        $authorId = isset($inputData['authorId']) ? (int) $inputData['authorId'] : null;
        $content = isset($inputData['content']) ? $inputData['content'] : '';

        $forumModel = new Forum($this->getDB());
        $result = $forumModel->addPostsToSubject($subjectId, $authorId, $content);

        if ($result) {
            http_response_code(201);
            echo json_encode(["message" => "Message ajouté avec succès."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erreur serveur lors de l'ajout du message."]);
        }
    }
}

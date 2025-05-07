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
}

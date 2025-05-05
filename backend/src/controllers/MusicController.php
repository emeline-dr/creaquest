<?php

namespace App\Controllers;

use App\Models\Music;

class MusicController extends Controller
{
    /* Récupérer les musiques */
    public function getMusicPlaylist(): void
    {
        $musicModel = new Music($this->getDB());
        $result = $musicModel->getMusic();

        if ($result) {
            header('Content-Type: application/json');
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Musiques non trouvées"]);
        }
    }
}

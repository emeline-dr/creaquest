<?php

namespace Router;

use Database\DBConnexion;

class Route
{
    public $path;
    public $action;
    public $matches;

    public function __construct(
        string $path,
        string $action
    ) {
        $this->path = trim($path, '/');
        $this->action = $action;
    }

    public function matches(string $url)
    {
        $path = preg_replace('#:([\w]+)#', '([^/]+)', $this->path);
        $pathToMatch = "#^$path$#";

        if (preg_match($pathToMatch, $url, $matches)) {
            $this->matches = $matches;
            return true;
        } else {
            return false;
        }
    }

    public function execute()
    {
        $params = explode('@', $this->action);
        $controller = new $params[0](
            new DBConnexion(DB_NAME, DB_HOST, DB_USER, DB_PASSWORD)
        );
        $method = $params[1];

        // Si nous avons plusieurs paramètres, nous devons les passer tous à la méthode
        $numParams = count($this->matches) - 1; // Le premier élément est le chemin complet, les autres sont les paramètres
        $methodParams = array_slice($this->matches, 1, $numParams);

        return call_user_func_array([$controller, $method], $methodParams);
    }
}

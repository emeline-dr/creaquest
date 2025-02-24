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

    /* 
    Permet de vérifier si une route appelée "match
    avec les routes disponibles
    
    @param string $url - l'url appelée
    
    @return bool
    */
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

    /* Permet de retourner le bon contrôler avec ou sans paramètre */
    public function execute()
    {
        $params = explode('@', $this->action);
        $controller = new $params[0](
            new DBConnexion(DB_NAME, DB_HOST, DB_USER, DB_PASSWORD)
        );
        $method = $params[1];

        return isset($this->matches[1]) ? $controller->$method($this->matches[1]) :
            $controller->$method();
    }
}

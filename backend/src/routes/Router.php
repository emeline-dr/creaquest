<?php

namespace Router;

use App\Exceptions\NotFoundException;

class Router
{

    public $url;
    public $routes = [];

    public function __construct(
        string $url
    ) {
        $this->url = trim($url, '/');
    }

    /* 
    Enregistrement des routes triées par Request Method
    Ici en GET 

    Une route est une nouvelle instance de Route
    */
    public function get(string $path, string $action)
    {
        $this->routes['GET'][] = new Route($path, $action);
    }

    /* 
    Enregistrement des routes triées par Request Method 
    Ici en POST

    Une route est une nouvelle instance de Route
    */
    public function post(string $path, string $action)
    {
        $this->routes['POST'][] = new Route($path, $action);
    }

    /*
    Boucler sur nos routes, si on "match",
    on va appeler le bon contrôleur avec la bonne fonction

    Dans le cas contraire, on retourne un 404
    */
    public function run()
    {
        foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) {
            if ($route->matches($this->url)) {
                $route->execute();
                exit;
            }
        }

        throw new NotFoundException("La page demandée est introuvable.");
    }
}

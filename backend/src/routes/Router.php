<?php

namespace Router;

class Router
{
    public $url;
    public $routes = [];

    public function __construct()
    {
        // Récupérer l'URL de la requête sans la partie du domaine
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = ltrim($uri, '/');
        $uri = preg_replace('#^index\.php/?#', '', $uri); // enlève index.php/
        $this->url = rtrim($uri, '/');
    }

    public function get(string $path, string $action)
    {
        $this->routes['GET'][] = new Route($path, $action);
    }

    public function post(string $path, string $action)
    {
        $this->routes['POST'][] = new Route($path, $action);
    }

    public function run()
    {
        // Vérifier si des routes sont définies pour la méthode HTTP actuelle
        if (isset($this->routes[$_SERVER['REQUEST_METHOD']])) {
            foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $route) {
                // Vérifier si l'URL de la requête correspond à l'une des routes
                if ($route->matches($this->url)) {
                    $route->execute();
                    exit;
                }
            }
        }

        // Si aucune route n'est trouvée, renvoyer une erreur 404
        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
        exit();
    }
}

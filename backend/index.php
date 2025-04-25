<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

use Router\Router;

require "vendor/autoload.php";

/* Affichage des erreurs avec Whoops */
$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();

/* Définition des constantes */
define('DB_NAME', 'creaquest');
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

/* Instanciation du retour et définition des routes */
$router = new Router($_GET['api']);

/* Les Routes */
/* Login */
$router->post('/login', 'App\Controllers\UserController@loginPost');

/* Register */
$router->post('/register', 'App\Controllers\UserController@loginRegister');

/* User */
$router->get('/users/:id', 'App\Controllers\UserController@getUser');

/* Tasks */
$router->get('/tasks/writing/:id', 'App\Controllers\TaskController@getWritingTasks');
$router->get('/tasks/reading/:id', 'App\Controllers\TaskController@getReadingTasks');
$router->get('/tasks/drawing/:id', 'App\Controllers\TaskController@getDrawingTasks');

$router->get('/completed-tasks/writing/:id', 'App\Controllers\TaskController@getCompletedWritingTasks');
$router->get('/completed-tasks/reading/:id', 'App\Controllers\TaskController@getCompletedReadingTasks');
$router->get('/completed-tasks/drawing/:id', 'App\Controllers\TaskController@getCompletedDrawingTasks');

/* Lancement du routeur */
try {
    $router->run();
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(["error" => "Route not found"]);
    exit();
}

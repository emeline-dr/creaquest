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
define('DB_NAME', 'emelinedr_creaquest');
define('DB_HOST', 'mysql-emelinedr.alwaysdata.net');
define('DB_USER', 'emelinedr');
define('DB_PASSWORD', 'Eme410121');

date_default_timezone_set('Europe/Paris');

/* Instanciation du retour et définition des routes */
$requestUri = $_SERVER['REQUEST_URI'];  // Récupère l'URL complète
$parts = explode('/api/', $requestUri);  // Extrait la partie de l'URL après "/api/"
$router = new Router($parts[1] ?? '');  // Si la route après "/api/" existe, utilise-la

/* Les Routes */
/* Login */
$router->post('/login', 'App\Controllers\UserController@loginPost');

/* Register */
$router->post('/register', 'App\Controllers\UserController@loginRegister');

/* User */
$router->get('/users', 'App\Controllers\UserController@getAllUsers');
$router->get('/users/:id', 'App\Controllers\UserController@getUser');

/* Tasks */
$router->get('/tasks/writing/:id', 'App\Controllers\TaskController@getWritingTasks');
$router->get('/tasks/reading/:id', 'App\Controllers\TaskController@getReadingTasks');
$router->get('/tasks/drawing/:id', 'App\Controllers\TaskController@getDrawingTasks');

$router->get('/completed-tasks/writing/:id', 'App\Controllers\TaskController@getCompletedWritingTasks');
$router->get('/completed-tasks/reading/:id', 'App\Controllers\TaskController@getCompletedReadingTasks');
$router->get('/completed-tasks/drawing/:id', 'App\Controllers\TaskController@getCompletedDrawingTasks');

$router->post('/tasks/validation/writing/:userId/:taskId', 'App\Controllers\TaskController@validateWritingTask');
$router->post('/tasks/validation/reading/:userId/:taskId', 'App\Controllers\TaskController@validateReadingTask');
$router->post('/tasks/validation/drawing/:userId/:taskId', 'App\Controllers\TaskController@validateDrawingTask');

/* Music */
$router->get('/music', 'App\Controllers\MusicController@getMusicPlaylist');

/* Forum */
$router->get('/forum/categories', 'App\Controllers\ForumController@getAllCategories');
$router->get('/forum/subjects',  'App\Controllers\ForumController@getAllSubjects');
$router->get('/forum/subjects/:id/posts', 'App\Controllers\ForumController@getAllPostsBySubject');
$router->get('/forum/posts', 'App\Controllers\ForumController@getAllPosts');
$router->post('/forum/posts/', 'App\Controllers\ForumController@addPost');

/* Lancement du routeur */
try {
    $router->run();
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(["error" => "Route not found"]);
    exit();
}

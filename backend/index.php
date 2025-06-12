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

use Dotenv\Dotenv;

/* Charger les variables d'environnement à partir du fichier .env */

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

/* Affichage des erreurs avec Whoops */
$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();

/* Définition des constantes */
define('DB_NAME', getenv('MYSQL_DATABASE'));
define('DB_HOST', getenv('MYSQL_HOST'));
define('DB_USER', getenv('MYSQL_USER'));
define('DB_PASSWORD', getenv('MYSQL_PASSWORD'));
define('DB_PORT', getenv('MYSQL_PORT'));

date_default_timezone_set('Europe/Paris');

/* Instanciation du retour et définition des routes */
$router = new Router();

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
$router->get('/forum/categories/:id/subjects', 'App\Controllers\ForumController@getSubjectsByCategory');
$router->get('/forum/subjects/:id/posts', 'App\Controllers\ForumController@getAllPostsBySubject');
$router->get('/forum/posts', 'App\Controllers\ForumController@getAllPosts');
$router->post('/forum/posts/', 'App\Controllers\ForumController@addPost');

/* Lancement du routeur */
try {
    $router->run();
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(["error" => "Route not found", "message" => $e->getMessage()]);
    exit();
}

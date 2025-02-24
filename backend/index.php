<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

use App\Exceptions\NotFoundException;
use Router\Router;

require "vendor/autoload.php";

/* Affichage des erreurs avec Whoops */
$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
$whoops->register();

/* Définition des constantes */
define('SCRIPTS', dirname($_SERVER['SCRIPT_NAME']) . DIRECTORY_SEPARATOR);
define('DB_NAME', 'creaquest');
define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

/* Instanciation du retour et définition des routes */
$router = new Router($_GET['api']);

/* Les Routes */
$router->get('/users', 'App\Controllers\UserController@index');

/* Lancement du routeur */
try {
    $router->run();
} catch (NotFoundException $e) {
    /* Si 404, on catch et on affiche */
    return $e->error404();
}

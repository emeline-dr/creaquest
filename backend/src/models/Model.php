<?php

namespace App\Models;

use PDO;
use Database\DBConnexion;
use \AllowDynamicProperties;

#[AllowDynamicProperties]
abstract class Model
{
    protected $table;

    /* On récupère la connexion à la DB dans le constructeur du Model */
    public function __construct(
        protected DBConnexion $db,
    ) {}

    /* 
    Retourne un ensemble d'une table
    @return array - le contenu de la table ciblée
    */
    public function all(): array
    {
        return $this->query("SELECT * FROM {$this->table} ORDER BY u_id DESC");
    }

    /* 
    Permet de lancer un query avec différents paramètres
    
    @param string $sql - La requête à exécuter
    @param int $param - S'il s'agit d'un query ou d'un prepare
    @param bool $single - Savoir si on veut faire un fetchAll ou un fetch
    */
    public function query(string $sql, ?array $param = null, ?bool $single = null)
    {
        $method = is_null($param) ? 'query' : 'prepare';

        if (
            strpos($sql, 'DELETE') === 0
            || strpos($sql, 'UPDATE') === 0
            || strpos($sql, 'INSERT') === 0
        ) {
            $stmt = $this->db->getPDO()->$method($sql);
            $stmt->setFetchMode(PDO::FETCH_CLASS, get_class($this), [$this->db]);
            return $stmt->execute($param);
        }

        $fetch = is_null($single) ? 'fetchAll' : 'fetch';

        $stmt = $this->db->getPDO()->$method($sql);
        $stmt->setFetchMode(PDO::FETCH_CLASS, get_class($this), [$this->db]);

        if ($method === 'query') {
            return $stmt->$fetch();
        } else {
            $stmt->execute($param);
            return $stmt->$fetch();
        }
    }
}

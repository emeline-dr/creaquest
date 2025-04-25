<?php

namespace App\Models;

use PDO;
use Database\DBConnexion;
use \AllowDynamicProperties;

#[AllowDynamicProperties]
abstract class Model
{
    protected $table;

    public function __construct(
        protected DBConnexion $db,
    ) {}

    public function query(string $sql, ?array $param = null, ?bool $single = null)
    {
        $method = is_null($param) ? 'query' : 'prepare';
        $stmt = $this->db->getPDO()->$method($sql);
        $stmt->setFetchMode(PDO::FETCH_CLASS, get_class($this), [$this->db]);

        // Vérifier si c'est une requête de modification (INSERT, UPDATE, DELETE)
        if (preg_match('/^(DELETE|UPDATE|INSERT)/i', $sql)) {
            return $stmt->execute($param);
        }

        // Exécuter la requête si elle est préparée
        if ($method === 'prepare') {
            $stmt->execute($param);
        }

        return is_null($single) ? $stmt->fetchAll() : $stmt->fetch();
    }
}

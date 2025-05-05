<?php

namespace App\Models;

class Music extends Model
{
    protected $table = 'music';
    public function getMusic()
    {
        $result = $this->query("SELECT * FROM {$this->table}");

        if ($result) {
            return $result;
        }
        return null;
    }
}

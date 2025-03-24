<?php

namespace App\Models;

class Task extends Model
{
    protected $w_table = 'writing';
    protected $d_table = 'drawing';
    protected $r_table = 'reading';

    public function getWritingTask($userId)
    {
        return $this->query("
        SELECT w.*
        FROM writing w
        LEFT JOIN users_writing uw ON w.w_id = uw.users_writing_w_id 
        AND uw.users_writing_u_id = ?
        WHERE uw.users_writing_w_id IS NULL;
        ", [$userId]);
    }

    public function getReadingTask($userId)
    {
        return $this->query("
        SELECT r.*
        FROM reading r
        LEFT JOIN users_reading ur ON r.r_id = ur.users_reading_r_id 
        AND ur.users_reading_u_id = ?
        WHERE ur.users_reading_r_id IS NULL;
        ", [$userId]);
    }

    public function getDrawingTask($userId)
    {
        return $this->query("
        SELECT d.* 
        FROM drawing d
        LEFT JOIN users_drawing ud ON d.d_id = ud.users_drawing_d_id
        AND ud.users_drawing_u_id = ?
        WHERE ud.users_drawing_d_id IS NULL;
        ", [$userId]);
    }
}

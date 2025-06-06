<?php

namespace App\Models;

class Forum extends Model
{
    protected $table_categories = 'categories';
    protected $table_subjects = 'subjects';
    protected $table_posts = 'posts';
    public function getCategories()
    {
        $result = $this->query("SELECT * FROM {$this->table_categories}");

        if ($result) {
            return $result;
        }
        return null;
    }

    public function getSubjects()
    {
        $result = $this->query("SELECT * FROM {$this->table_subjects}");

        if ($result) {
            return $result;
        }
        return null;
    }

    public function getPosts()
    {
        $result = $this->query("SELECT * FROM {$this->table_posts}");

        if ($result) {
            return $result;
        }
        return null;
    }

    public function getPostsBySubject($subjectId)
    {
        $result = $this->query("SELECT 
                p.*, 
                u.u_id AS author_id, 
                u.u_username AS author_username, 
                u.u_avatar AS author_avatar
            FROM {$this->table_posts} AS p
            JOIN users AS u ON p.p_author_id = u.u_id
            WHERE p.p_subject_id = ?", [$subjectId]);

        if ($result) {
            return $result;
        }
        return null;
    }

    public function addPostsToSubject($subjectId, $authorId, $content)
    {
        $date = date("Y-m-d H:i:s");

        $result = $this->query("INSERT INTO {$this->table_posts} (p_author_id, p_subject_id, p_content, p_date) 
            VALUES (?, ?, ?, ?)", [$authorId, $subjectId, $content, $date]);

        if ($result) {
            return true;
        }

        return false;
    }
}

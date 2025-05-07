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
        $result = $this->query("SELECT * FROM {$this->table_posts} WHERE p_subject_id = ?", [$subjectId]);

        if ($result) {
            return $result;
        }
        return null;
    }
}

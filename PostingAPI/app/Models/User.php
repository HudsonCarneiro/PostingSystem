<?php

namespace App\Models\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'name', 'email', 'password',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

}

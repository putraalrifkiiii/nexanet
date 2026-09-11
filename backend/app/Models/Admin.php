<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Foundation\Auth\User as Authenticatable;

#[Fillable(['name', 'nama_admin', 'email', 'password', 'no_telepon', 'remember_token'])]
class Admin extends Authenticatable
{
    protected $table = 'admin';

    protected $hidden = [
        'password',
    ];

    protected $attributes = [
        'no_telepon' => '-',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['nama_admin'] = $value;
    }

    public function getNameAttribute()
    {
        return $this->attributes['nama_admin'];
    }
}
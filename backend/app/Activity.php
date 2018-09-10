<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Activity extends Model
{
    protected $table = 'activity';

    protected $guarded = [];

    public function user()
    {
        return $this->belongsToMany('App\User')
                    ->using('App\SignUp')
                    ->withPivot('id', 'created_at', 'updated_at')
                    ->withTimestamps();
    }

    public function image()
    {
        return $this->hasOne('App\Image');
    }
}
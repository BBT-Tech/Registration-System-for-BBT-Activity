<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table='user';
    
    public $timestamps = true;
    
    protected $guarded=[];

    public function activity()
    {
        return $this->belongsToMany('App\Activity')
                    ->using('App\SignUp')
                    ->withPivot('id','created_at','updated_at')
                    ->withTimestamps();
    }
}

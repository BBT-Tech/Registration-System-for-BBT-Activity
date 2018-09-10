<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SignUp extends Pivot
{
    protected $table='activity_user';
    
    protected $guarded=[];
}
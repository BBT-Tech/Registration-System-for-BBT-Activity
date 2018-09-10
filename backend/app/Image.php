<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table='image';
    
    public $timestamps = true;
    
    protected $guarded=[];

    public function activity()
    {
        return $this->belongsTo('App\Activity')->withDefault();
    }
}
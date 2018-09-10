<?php
namespace App;

use Illuminate\Database\Eloquent\Model;


class MemberNow extends Model
{
    protected $table='current_member_list';
    
    protected $guarded=[];
}
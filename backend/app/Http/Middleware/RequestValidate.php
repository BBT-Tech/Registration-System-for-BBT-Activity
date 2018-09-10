<?php

namespace App\Http\Middleware;

use Closure;
use Validator;


class RequestValidate
{
    public function handle($request,Closure $next,$type)
    {
        if ($type==0)$validate0=['title'=>'required|max:25'];
        else $validate0=[];
        $validate=[
            'details'=>'required|max:100',
            'action_time'=>'required_without:book_time|date_format:Y-m-d H:i:s|after:now',
            'book_time'=>'required_without:action_time|date_format:Y-m-d H:i:s|after:now',
            'member'=>'required_with:action_time|integer|min:0',
            'award'=>'required_with:book_time|integer|min:0',
            'member_list.*'=>'required_with:award|integer|min:0',
            'member_list'=>[
                'bail',
                'required_with:award',
                'array',
                function($attribute, $value, $fail)use($request){
                    $sum=0;
                    foreach($value as $int)$sum+=$int;
                    if(($request->award!=0)&&($sum<$request->award))
                    return $fail(':attribute和需大于奖品数哦！');
                }]

            ];
        $validate=array_merge($validate0,$validate);
        $validator=Validator::make($request->all(),$validate,[
            'required'=>':attribute 是必须的哟！',
            'max'=>':attribute 不能超过:max字符哦！',
            'min'=>':attribute 不能小于:min哦！',
            'integer'=>':attribute 必须为整数哦！',
            'required_without'=>':attribute 必须有哦！',
            'date_format'=>':attribute 格式不对哦！',
            'after'=>':attribute 需要在当前时间之后哦！',
            'array'=>':attribute 必须为数组哦！'
        ],[
            'title'=>'活动标题',
            'details'=>'活动详情',
            'action_time'=>'志愿活动开始时间',
            'book_time'=>'福利领取时间',
            'member'=>'报名人数上限',
            'award'=>'奖品数',
            'member_list'=>'各部门人数上限',
            'member_list.*'=>'部门人数上限'
        ]);
        $errcode=0;
        $errmsg='';
        if ($validator->fails()){
            $errcode=2;
            foreach ($validator->errors()->all() as $err)
            $errmsg=$errmsg.$err.'<br>';
            return response()->json([
                'err_code'=>$errcode,
                'err_msg'=>$errmsg
            ]);
        }
        
        return $next($request);
    }
}
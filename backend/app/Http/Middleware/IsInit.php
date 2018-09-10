<?php

namespace App\Http\Middleware;

use Closure;


class IsInit
{
    public function handle($request,Closure $next)
    {
         if (!($request->session()->has('name')))
            return response()->json([
                'err_code' => 7,
                'err_msg' => '还没有登录哦！',
        ]);
        
        return $next($request);
    }
}
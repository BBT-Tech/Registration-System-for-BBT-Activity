<?php

namespace App\Http\Middleware;

use Closure;


class IsManager
{
    public function handle($request,Closure $next)
    {
        if (!($request->session()->get('is_manager')))
            return response()->json([
                'err_code' => 1,
                'err_msg' => '权限不足！',
        ]);
        
        return $next($request);
    }
}
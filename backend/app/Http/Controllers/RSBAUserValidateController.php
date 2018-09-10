<?php
namespace App\Http\Controllers;



use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;


class RSBAUserValidateController extends Controller
{
    //打开页面时身份验证
    public function init(Request $request)
    {
        if ($request->session()->has('name'))
            return response()->json([
            'err_code' => 0,
            'err_msg' => '',
            'data' => [
                'logined' => true,
                'student_id' => $request->session()->get('student_id'),
                'name' => $request->session()->get('name'),
                'is_manager' => $request->session()->get('is_manager')
            ]
        ]);
        else return response()->json([
            'err_code' => 0,
            'err_msg' => '',
            'data' => [
                'logined' => false
            ]
        ]);
    }

    //退出登录
    public function signout(Request $request)
    {
        $request->session()->flush();
        return response()->json([
            'err_code' => 0,
            'err_msg' => '',
        ]);
    }

    //登录认证
    public function login(Request $request)
    {
        if ($request->session()->has('name'))
            return response()->json([
            'err_code' => 8,
            'err_msg' => '请勿重复登录哦！',
        ]);
        $server_url = config('RSBA-Validate.auth_url');

        $post_data = array(
            'key' => config('RSBA-Validate.auth_key'),
            'stuno' => $request->student_id,
            'password' => $request->password
        );
        $post_string = http_build_query($post_data);
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $server_url);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $post_string);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($curl);
        curl_close($curl);
        $data = json_decode($data, true);
        if ($data['errcode'] != 0)
            return response()->json([
            'err_code' => $data['errcode'],
            'err_msg' => $data['errmsg'],
        ]);

        $data = $data['data'];
        $jud = (($data['grp'] == '主管') || ($data['grp'] == '干事')) ? false : true;
        $request->session()->put([
            'student_id' => $request->student_id,
            'name' => $data['name'],
            'tele' => $data['mobile'],
            'dep' => $data['dep'],
            'is_manager' => $jud

        ]);
        $user = User::where('name', $data['name'])->first();
        if ($user == null) $user = new User;
        $user->stuno = $request->student_id;
        $user->name = $data['name'];
        $user->department = config('RSBA.' . $data['dep']);
        $user->tele = $data['mobile'];
        $user->grp = $data['grp'];
        $user->save();

        return response()->json([
            'err_code' => 0,
            'err_msg' => '',
            'data' => [
                'name' => $data['name'],
                'is_manager' => $jud
            ]
        ]);
    }
}
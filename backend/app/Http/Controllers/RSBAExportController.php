<?php
namespace App\Http\Controllers;

use App\Exports\RSBAExport;
use App\Activity;
use App\Exports\ActivityUserExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\User;

class RSBAExportController extends Controller
{
    public function export0(Request $request)
    {
        if (User::where('name', $request->session()->get('name'))->first()->department != 7)
            return abort(404);
        return (new RSBAExport)->download('百步梯活动管理系统' . date('Y-m-d H:i:s') . '.xlsx');
    }
    public function export1(Request $request, $id)
    {
        if (User::where('name', $request->session()->get('name'))->first()->department != 7)
            return abort(404);
        return (new ActivityUserExport($id))->download(Activity::find($id)->title . '-人员报名表-' . date('Y-m-d h:i:s') . '.xlsx');
    }
    public function export(Request $request, $id)
    {
        $users = Activity::find($id)->user()->select('name', 'stuno', 'department', 'tele')->get();
        $content = chr(239) . chr(187) . chr(191) . "姓名,学号,部门,手机\n";
        foreach ($users as $user) {
            $content .= $user->name . ',';
            $content .= $user->stuno . "\t" . ',';
            $content .= config('RSBA.' . $user->department) . ',';
            $content .= $user->tele . "\t\n";
        }
        //$content = iconv("UTF-8", "GBK//IGNORE", $content);
        $title = Activity::find($id)->title . '-人员报名表-' . date('Y-m-d H:i:s');
        return response($content)
            ->withHeaders([
                'Content-type' => 'text/csv;charset=GB2312',
                'Content-Disposition' => 'attachment;filename=' . $title . '.csv',
                'Cache-Control' => 'must-revalidate,post-check=0,pre-check=0',
                'Expires' => '0',
                'Pragma' => 'public',
            ]);
    }
}
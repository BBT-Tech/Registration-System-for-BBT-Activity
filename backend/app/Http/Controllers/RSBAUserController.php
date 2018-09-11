<?php
namespace App\Http\Controllers;



use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Activity;
use App\MemberList;
use App\MemberNow;
use App\User;
use Illuminate\Support\Facades\DB;




class RSBAUserController extends Controller
{
    //用户报名
    public function register(Request $request, $id)
    {
        $name = $request->session()->get('name');
        $activity = Activity::find($id);
        if ($activity == null)
            return response()->json([
            'err_code' => 4,
            'err_msg' => '活动不存在！'
        ]);
        if (($activity->type == 0) && ($activity->time < date("Y-m-d H:i:s")))
            return response()->json([
            'err_code' => 6,
            'err_msg' => '活动已开始！'
        ]);
        if (($activity->type == 1) && ($activity->time > date("Y-m-d H:i:s")))
            return response()->json([
            'err_code' => 6,
            'err_msg' => '活动未开始！'
        ]);
        $user = User::where('name', $name)->first();
        if ($activity->user()->where('name', $user->name)->exists())
            return response()->json([
            'err_code' => 9,
            'err_msg' => '已经报过名了哦！'
        ]);
        $sum = 0;
        $errcode = -1;
        $errmsg = '完了，凉凉';
        DB::transaction(function () use ($activity, $user, $id, $name, &$errcode, &$errmsg) {
            $ml = MemberList::find($id);
            $mn = MemberNow::find($id);
            $member = $activity->member;
            $award = $activity->award;
            $current = $activity->current_member;
            if ((($current >= $member) && ($activity->type == 0)) || (($current >= $award) && ($activity->type == 1))) {
                $errcode = 1;
                $errmsg = '总人数已达上限哦！';
            } else if (($mn->{'dep' . $user->department} >= $ml->{'dep' . $user->department}) && ($activity->type == 1)) {
                $errcode = 2;
                $errmsg = '部门人数已达上限哦！';
            } else {
                $activity->current_member++;
                $mn->{'dep' . $user->department}++;
                $activity->save();
                $mn->save();
                $activity->user()->attach($user->id);
                $errcode = 0;
                $errmsg = '';
            }
        }, 5);
        return response()->json([
            'err_code' => $errcode,
            'err_msg' => $errmsg
        ]);
    }

    //用户取消报名
    public function unregister(Request $request, $id)
    {
        $name = $request->session()->get('name');
        $activity = Activity::find($id);
        if ($activity == null)
            return response()->json([
            'err_code' => 4,
            'err_msg' => '活动不存在！'
        ]);
        if (($activity->type == 0) && ($activity->time < date("Y-m-d H:i:s")))
            return response()->json([
            'err_code' => 6,
            'err_msg' => '活动已开始！'
        ]);
        if (($activity->type == 1) && ($activity->time > date("Y-m-d H:i:s")))
            return response()->json([
            'err_code' => 6,
            'err_msg' => '活动未开始！'
        ]);
        $user = User::where('name', $name)->first();
        if (!$activity->user()->where('name', $user->name)->exists())
            return response()->json([
            'err_code' => 9,
            'err_msg' => '还没报名哦！'
        ]);
        $sum = 0;
        $errcode = -1;
        $errmsg = '服务器不干了（请稍后再试哦！）';
        DB::transaction(function () use ($activity, $user, $id, $name, &$errcode, &$errmsg) {
            $ml = MemberList::find($id);
            $mn = MemberNow::find($id);
            $member = $activity->member;
            $award = $activity->member;
            $current = $activity->current_member;
            $activity->current_member--;
            $mn->{'dep' . $user->department}--;
            $activity->save();
            $mn->save();
            $activity->user()->detach($user->id);
            $errcode = 0;
            $errmsg = '';
            //}
        }, 5);
        return response()->json([
            'err_code' => $errcode,
            'err_msg' => $errmsg
        ]);
    }

    //浏览活动情况
    public function activity_query(Request $request)
    {
        $name = $request->session()->get('name');
        $user = User::where('name', $name)->first();
        if ($user == null)
            return response()->json([
            'err_code' => 4,
            'err_msg' => '尚未登录哦！'
        ]);
        if (Activity::all()->first() == null)
            return response()->json([
            'err_code' => 0,
            'err_msg' => '',
            'data' => [
                'is_end' => true,
                'activities' => []
            ]
        ]);
        if ($request->start_id == 0) $startid = Activity::orderby('id', 'desc')->first()->id;
        else $startid = $request->start_id;
        switch ($request->type) {
            case 0:
                $activities = Activity::where('id', '<=', $startid)
                    ->orderBy('id', 'desc')
                    ->take($request->number + 1)
                    ->get();
                break;
            case 1:
                $activities = Activity::whereDoesntHave('user', function ($query) use ($user) {
                    $query->where('name', $user->name);
                })->orderBy('id', 'desc')
                    ->take($request->number + 1)
                    ->get();
                break;
            case 2:
                $activities = Activity::whereHas('user', function ($query) use ($user) {
                    $query->where('name', $user->name);
                })->orderBy('id', 'desc')
                    ->take($request->number + 1)
                    ->get();
                break;
            case 3:
                $activities = Activity::where('publisher', $user->name)
                    ->orderBy('id', 'desc')
                    ->take($request->number + 1)
                    ->get();
                break;
        }

        $i = 0;
        $data = array();
        $actsdata = array();
        foreach ($activities as $act) {
            $i++;
            $ary = null;
            $ary = [
                'id' => $act->id,
                'is_publisher' => ($name == $act->publisher) ? true : false,
                'registered' => ($act->user()->where('name', $name)->get()->isEmpty()) ? false : true,
                'type' => $act->type,
                'title' => $act->title,
                'details' => $act->details
            ];
            if ($act->type == 0) {
                $ary['action_time'] = $act->time;
                $ary['member'] = $act->member;
            } else {
                $ary['book_time'] = $act->time;
                $ary['award'] = $act->award;
            }
            $ary['current_member'] = $act->current_member;
            if (($act->type == 1) && (MemberList::find($act->id)->{'dep' . $user->department} <= MemberNow::find($act->id)->{'dep' . $user->department}))
                $ary['is_department_full'] = MemberList::find($act->id)->{'dep' . $user->department};
            else $ary['is_department_full'] = false;
            $ary['image'] = '/activityimg/' . (($act->image()->get()->isEmpty()) ? '0' : $act->image()->first()->img_name);
            $actsdata[] = $ary;
        }
        if ($i == $request->number + 1) {
            array_pop($actsdata);
            $data['is_end'] = false;
        } else $data['is_end'] = true;
        $data['activities'] = $actsdata;
        return response()->json([
            'err_code' => 0,
            'err_msg' => '',
            'data' => $data
        ]);
    }


}
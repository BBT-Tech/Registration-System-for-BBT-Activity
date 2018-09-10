<?php

namespace App\Exports;

use App\MemberNow;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class MemberNowExport implements FromCollection, WithStrictNullComparison, WithHeadings, WithTitle
{
    public function headings() : array
    {
        return [
            '活动id',
            '编辑部',
            '综合管理部',
            '综合新闻部',
            '外联部',
            '策划推广部',
            '节目部',
            '人力资源部',
            '技术部',
            '视频部',
            '视觉设计部',
            '发布时间',
            '修改时间'

        ];
    }
    public function title() : string
    {
        return '活动部门已报人数表';
    }
    public function collection()
    {
        return MemberNow::all();
    }
}
<?php

namespace App\Exports;

use App\Activity;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class ActivityExport implements FromCollection, WithStrictNullComparison,WithHeadings,ShouldAutoSize,WithTitle
{
    public function headings(): array
    {
        return [
            '活动id',
            '活动类型',
            '活动类型',
            '活动发布者',
            '活动详情',
            '活动时间',
            '奖品数',
            '限制人数',
            '已报人数',
            '发布时间',
            '修改时间'
        ];
    }
    public function title(): string
    {
        return '活动表';
    }
    public function collection()
    {
        return Activity::all();
    }
}
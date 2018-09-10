<?php

namespace App\Exports;

use App\Activity;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class ActivityUserExport implements FromCollection, WithStrictNullComparison, ShouldAutoSize, WithTitle, WithHeadings
{
    use Exportable;
    public $id = 1;
    public function headings() : array
    {
        return [
            '姓名',
            '学号',
            '部门',
            '手机'
        ];
    }
    public function __construct(int $id)
    {
        $this->id = $id;
    }
    public function title() : string
    {
        return Activity::find($this->id)->title . '-人员报名表';
    }
    public function collection()
    {
        $acts=Activity::find($this->$id)->user()->select('name', 'stuno', 'department', 'tele');   
        return $acts;

    }
}
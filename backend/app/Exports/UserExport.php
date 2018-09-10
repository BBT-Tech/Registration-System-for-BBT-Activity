<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithTitle;

class UserExport implements FromCollection, WithStrictNullComparison,WithHeadings,ShouldAutoSize,WithTitle
{
    public function headings(): array
    {
        return [
            'id',
            '学号',
            '姓名',
            '部门',
            '组别',
            '手机',
            '初登时间',
            '修改时间'
        ];
    }
    public function title(): string
    {
        return '用户表';
    }
    public function collection()
    {
        return User::all();
    }
}
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class RSBAExport implements WithMultipleSheets
{
    use Exportable;
    
    public function sheets(): array
    {
        $sheets = [];
        $sheets[]=new ActivityExport();
        $sheets[]=new UserExport();
        $sheets[]=new MemberListExport();
        $sheets[]=new MemberNowExport();

        return $sheets;
    }
}
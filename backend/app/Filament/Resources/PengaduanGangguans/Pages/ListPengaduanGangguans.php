<?php

namespace App\Filament\Resources\PengaduanGangguans\Pages;

use App\Filament\Resources\PengaduanGangguans\PengaduanGangguanResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPengaduanGangguans extends ListRecords
{
    protected static string $resource = PengaduanGangguanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

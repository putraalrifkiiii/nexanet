<?php

namespace App\Filament\Resources\PaketWifis\Pages;

use App\Filament\Resources\PaketWifis\PaketWifiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPaketWifis extends ListRecords
{
    protected static string $resource = PaketWifiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

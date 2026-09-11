<?php

namespace App\Filament\Resources\PaketWifis\Pages;

use App\Filament\Resources\PaketWifis\PaketWifiResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPaketWifi extends ViewRecord
{
    protected static string $resource = PaketWifiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}

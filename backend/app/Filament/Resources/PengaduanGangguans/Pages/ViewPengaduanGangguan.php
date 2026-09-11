<?php

namespace App\Filament\Resources\PengaduanGangguans\Pages;

use App\Filament\Resources\PengaduanGangguans\PengaduanGangguanResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPengaduanGangguan extends ViewRecord
{
    protected static string $resource = PengaduanGangguanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}

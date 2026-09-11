<?php

namespace App\Filament\Resources\PengaduanGangguans\Pages;

use App\Filament\Resources\PengaduanGangguans\PengaduanGangguanResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPengaduanGangguan extends EditRecord
{
    protected static string $resource = PengaduanGangguanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}

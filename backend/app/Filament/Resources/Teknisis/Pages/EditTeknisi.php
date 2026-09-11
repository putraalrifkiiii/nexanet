<?php

namespace App\Filament\Resources\Teknisis\Pages;

use App\Filament\Resources\Teknisis\TeknisiResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditTeknisi extends EditRecord
{
    protected static string $resource = TeknisiResource::class;

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

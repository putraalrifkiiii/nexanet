<?php

namespace App\Filament\Resources\Teknisis\Pages;

use App\Filament\Resources\Teknisis\TeknisiResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewTeknisi extends ViewRecord
{
    protected static string $resource = TeknisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}

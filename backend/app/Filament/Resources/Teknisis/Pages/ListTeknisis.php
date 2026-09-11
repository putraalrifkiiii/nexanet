<?php

namespace App\Filament\Resources\Teknisis\Pages;

use App\Filament\Resources\Teknisis\TeknisiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListTeknisis extends ListRecords
{
    protected static string $resource = TeknisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

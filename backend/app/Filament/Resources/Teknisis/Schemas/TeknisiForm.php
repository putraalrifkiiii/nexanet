<?php

namespace App\Filament\Resources\Teknisis\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TeknisiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_teknisi')
                    ->required()
                    ->maxLength(255),
                TextInput::make('no_telepon')
                    ->tel()
                    ->maxLength(16)
                    ->placeholder('pakai format: +62xxxxxxxxxxx'),
                Select::make('status_ketersediaan')
                    ->options([
                        'tersedia' => 'Tersedia',
                        'tidak_tersedia' => 'Tidak Tersedia',
                    ])
                    ->required()
                    ->default('tersedia'),

            ]);
    }
}
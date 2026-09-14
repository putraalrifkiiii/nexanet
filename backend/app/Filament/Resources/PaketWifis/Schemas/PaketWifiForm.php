<?php

namespace App\Filament\Resources\PaketWifis\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PaketWifiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_paket')
                    ->required()
                    ->maxLength(255)
                    ->datalist(['Paket Lite', 'Paket Dash', 'Paket Rocket', 'Paket Sonic']),
                TextInput::make('kecepatan_mbps')
                    ->required()
                    ->numeric()
                    ->suffix(' Mbps'),
                TextInput::make('harga')
                    ->required()
                    ->numeric()
                    ->step(50000)
                    ->prefix('Rp ')
                    ->suffix(',-'),
                TextInput::make('biaya_pemasangan')
                    ->required()
                    ->numeric()
                    ->step(50000)
                    ->prefix('Rp ')
                    ->suffix(',-'),
                Textarea::make('deskripsi_paket')
                    ->maxLength(255)
                    ->placeholder('Contoh: Paket internet dengan kecepatan tinggi untuk streaming dan gaming.'),
            ]);
    }
}

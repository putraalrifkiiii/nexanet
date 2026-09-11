<?php

namespace App\Filament\Resources\Penggunas\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class PenggunaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama')
                    ->required()
                    ->maxLength(255),
                Textarea::make('alamat')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                TextInput::make('no_telepon')
                    ->tel()
                    ->label('No. Telepon')
                    ->maxLength(16)
                    ->placeholder('pakai format: +62xxxxxxxxxxx'),
                TextInput::make('email')
                    ->email()
                    ->placeholder('Contoh: budi@gmail.com')
                    ->required()
                    ->maxLength(255),
                TextInput::make('password')
                    ->password()
                    ->revealable()
                    ->required()
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state)) 
                    ->dehydrated(fn ($state) => filled($state)),
            ]);
    }
}
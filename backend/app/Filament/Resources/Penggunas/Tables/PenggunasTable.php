<?php

namespace App\Filament\Resources\Penggunas\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class PenggunasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama')
                    ->label('Nama')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('alamat')
                    ->label('Alamat')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('no_telepon')
                    ->copyable()
                    ->copyMessage('Nomor HP disalin')
                    ->label('No. Telepon')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->copyable()
                    ->copyMessage('Email disalin')
                    ->searchable(),
                TextColumn::make('langganan.paketWifi.nama_paket')
                    ->label('Paket Dimiliki')
                    ->badge() 
                    ->listWithLineBreaks(),
            ])
            ->filters([
                TrashedFilter::make(),
                SelectFilter::make('paket_wifi')
                    ->label('Filter Paket Dimiliki')
                    ->relationship('langganan.paketWifi', 'nama_paket'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
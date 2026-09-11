<?php

namespace App\Filament\Resources\PaketWifis\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;


class PaketWifisTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_paket')
                    ->label('Nama Paket')
                    ->searchable(),
                TextColumn::make('kecepatan_mbps')
                    ->label('Kecepatan (Mbps)')
                    ->sortable()
                    ->suffix(' Mbps')
                    ->searchable(),
                TextColumn::make('harga')
                    ->label('Harga')
                    ->sortable()
                    ->money('idr'),
                TextColumn::make('deskripsi_paket')
                    ->label('Deskripsi')
                    ->searchable()
                    ->limit(50)
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
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
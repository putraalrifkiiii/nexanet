<?php

namespace App\Filament\Resources\Penggunas\RelationManagers;

use Filament\Actions\AssociateAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DissociateAction;
use Filament\Actions\DissociateBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class LanggananRelationManager extends RelationManager
{
    protected static string $relationship = 'langganan';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('id_paket')
                    ->label('Paket Langganan')
                    ->relationship('paketWifi', 'nama_paket')
                    ->required(),
                DatePicker::make('tanggal_mulai')
                    ->label('Tanggal Mulai Berlangganan')
                    ->disabled()
                    ->dehydrated()
                    ->helperText('Otomatis terisi ketika pembayaran sudah Lunas.')
                    ->required(),

                DatePicker::make('tanggal_berakhir')
                    ->disabled()
                    ->dehydrated(),

                Select::make('status_langganan')
                    ->label('Status Berlangganan')
                    ->options([
                        'menunggu_pembayaran' => 'Menunggu Pembayaran',
                        'menunggu_pemasangan' => 'Menunggu Pemasangan',
                        'aktif' => 'Aktif',
                        'tidak_aktif' => 'Tidak Aktif',
                    ])
                    ->required()
                    ->default('menunggu_pembayaran')
                    ->required()
                    ->disabled()
                    ->dehydrated(),
                Select::make('id_teknisi')
                    ->label('Tugaskan Teknisi')
                    ->relationship('teknisi', 'nama_teknisi')
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih teknisi untuk instalasi'),

                TextInput::make('installation_cost')
                    ->label('Biaya Pasang')
                    ->numeric()
                    ->disabled()
                    ->dehydrated()
                    ->helperText('Otomatis terisi ketika pembayaran sudah Lunas.')
                    ->required(),
            ]);
    }

    public function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Paket')
                    ->description('Detail paket WiFi yang ditawarkan')
                    ->columnSpanFull()
                    ->schema([
                        TextEntry::make('paketWifi.nama_paket')
                            ->label('Nama Paket')
                            ->weight('bold'),

                        TextEntry::make('paketWifi.harga')
                            ->label('Harga Bulanan')
                            ->money('IDR'),

                        TextEntry::make('paketWifi.kecepatan_mbps')
                            ->label('Kecepatan (Mbps)')
                            ->badge()
                            ->color('success'),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id_paket')
            ->columns([
                TextColumn::make('pengguna.nama')
                    ->label('Nama Pengguna')
                    ->searchable(),
                TextColumn::make('paketWifi.nama_paket')
                    ->label('Paket Langganan')
                    ->searchable(),
                TextColumn::make('tanggal_mulai')
                    ->date()
                    ->searchable(),
                TextColumn::make('tanggal_berakhir')
                    ->date()
                    ->searchable(),
                TextColumn::make('status_langganan')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucwords(str_replace('_', ' ', $state))) // Mengubah 'menunggu_pembayaran' jadi 'Menunggu Pembayaran'
                    ->color(fn (string $state): string => match ($state) {
                        'menunggu_pembayaran' => 'warning',
                        'menunggu_pemasangan' => 'info',
                        'aktif' => 'success',
                        'tidak_aktif' => 'danger',
                        default => 'gray',
                    })
                    ->sortable()
                    ->searchable(),

                TextColumn::make('teknisi.nama_teknisi')
                    ->label('Teknisi Bertugas')
                    ->placeholder('Belum ditugaskan'),
                TextColumn::make('installation_cost')
                    ->label('Biaya Pasang')
                    ->money('IDR')
                    ->sortable(),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->headerActions([
                CreateAction::make(),
                AssociateAction::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DissociateAction::make(),
                DeleteAction::make(),
                ForceDeleteAction::make(),
                RestoreAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DissociateBulkAction::make(),
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ])
            ->modifyQueryUsing(fn (Builder $query) => $query
                ->withoutGlobalScopes([
                    SoftDeletingScope::class,
                ]));
    }
}

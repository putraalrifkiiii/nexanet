<?php

namespace App\Filament\Resources\Penggunas\RelationManagers;

use App\Models\Langganan;
use App\Models\PaketWifi;
use App\Models\Pembayaran;
use Filament\Actions\AssociateAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DissociateAction;
use Filament\Actions\DissociateBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Components\Wizard;
use Filament\Schemas\Components\Wizard\Step;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class PembayaranRelationManager extends RelationManager
{
    protected static string $relationship = 'pembayaran';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('id_langganan')
                    ->label('Pilih Langganan / Paket WiFi')
                    ->relationship(
                        name: 'langganan',
                        titleAttribute: 'id',
                        modifyQueryUsing: fn (Builder $query) => $query->where('id_pengguna', $this->getOwnerRecord()->id)
                    )
                    ->live()
                    ->getOptionLabelFromRecordUsing(fn ($record) => "ID: {$record->id} - ".($record->paketWifi->nama_paket ?? 'Paket Tidak Ditemukan'))
                    ->afterStateUpdated(function ($state, callable $set) {
                        if (! $state) {
                            $set('total_pembayaran', 0);

                            return;
                        }

                        $langganan = Langganan::with('paketWifi')->find($state);
                        if ($langganan) {
                            $hargaPaket = floatval($langganan->paketWifi->harga ?? 0);
                            $installationCost = floatval($langganan->installation_cost ?? 150000);

                            $set('total_pembayaran', $hargaPaket + $installationCost);
                        }
                    })
                    ->createOptionForm([
                        Wizard::make([
                            Step::make('Nama Paket')
                                ->schema([
                                    Select::make('id_paket')
                                        ->label('Pilih Paket WiFi')
                                        ->relationship('paketWifi', 'nama_paket')
                                        ->live()
                                        ->afterStateUpdated(function ($state, Set $set, Get $get) {
                                            $hargaPaket = 0;
                                            if ($state) {
                                                $paket = PaketWifi::find($state);
                                                $hargaPaket = $paket ? floatval($paket->harga) : 0;
                                            }

                                            $set('harga_paket_temp', $hargaPaket);

                                            $installationCost = floatval($get('installation_cost') ?? 150000);
                                            $set('total_pembayaran', $hargaPaket + $installationCost);
                                        })
                                        ->required(),

                                    Placeholder::make('info_harga')
                                        ->label('Harga Paket Bulanan')
                                        ->content(function (Get $get) {
                                            $paketId = $get('id_paket');
                                            if (! $paketId) {
                                                return 'Pilih paket terlebih dahulu';
                                            }
                                            $paket = PaketWifi::find($paketId);

                                            return $paket ? 'Rp '.number_format($paket->harga, 0, ',', '.') : '-';
                                        }),
                                ]),

                            Step::make('Biaya Pemasangan')
                                ->schema([
                                    TextInput::make('installation_cost')
                                        ->label('Biaya Pemasangan / Instalasi')
                                        ->numeric()
                                        ->prefix('Rp')
                                        ->default(150000)
                                        ->live()
                                        ->afterStateUpdated(function ($state, Set $set, Get $get) {
                                            $hargaPaket = floatval($get('harga_paket_temp') ?? 0);
                                            $installationCost = floatval($state ?? 0);

                                            $set('total_pembayaran', $hargaPaket + $installationCost);
                                        })
                                        ->required(),

                                    TextInput::make('total_pembayaran')
                                        ->label('Total Pembayaran')
                                        ->numeric()
                                        ->prefix('Rp')
                                        ->default(150000)
                                        ->readOnly()
                                        ->dehydrated()
                                        ->live()
                                        ->required(),
                                ]),
                        ])->columnSpan('full'),
                    ])
                    ->createOptionUsing(function ($data, Get $get, Set $set): int {
                        $formData = is_array($data) ? $data : [];

                        $idPaket = $formData['id_paket'] ?? null;
                        $hargaPaket = 0;
                        if ($idPaket) {
                            $paket = PaketWifi::find($idPaket);
                            $hargaPaket = $paket ? floatval($paket->harga) : 0;
                        }

                        $installationCost = floatval($get('installation_cost') ?? 150000);
                        $totalPembayaran = $hargaPaket + $installationCost;

                        unset($formData['total_pembayaran']);
                        unset($formData['harga_paket_temp']);

                        $formData['id_pengguna'] = $this->getOwnerRecord()->id;

                        $langganan = Langganan::create($formData);
                        $set('total_pembayaran', $totalPembayaran);

                        return $langganan->id;
                    })
                    ->required(),

                TextInput::make('nomor_pembayaran')
                    ->label('Nomor Pembayaran')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->default(function () {
                        return Pembayaran::paymentNumber();
                    }),

                DatePicker::make('tanggal_bayar')
                    ->label('Tanggal Pembayaran')
                    ->required()
                    ->default(now()),

                TextInput::make('total_pembayaran')
                    ->label('Jumlah Bayar')
                    ->required()
                    ->numeric()
                    ->readOnly()
                    ->prefix('Rp'),

                Select::make('metode_pembayaran')
                    ->label('Metode Pembayaran')
                    ->required()
                    ->options([
                        'Cash' => 'Cash',
                        'Transfer Bank' => 'Transfer Bank',
                        'E-Wallet' => 'E-Wallet',
                    ]),

                Select::make('status_pembayaran')
                    ->label('Status')
                    ->required()
                    ->options([
                        'Lunas' => 'Lunas',
                        'Pending' => 'Pending (Menunggu Pembayaran)',
                        'Gagal' => 'Gagal / Dibatalkan',
                    ])
                    ->default('Lunas'),
            ]);

    }

    public function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pembayaran')
                    ->description('Detail Pembayaran Langganan')
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        TextEntry::make('nomor_pembayaran')
                            ->label('Nomor Pembayaran')
                            ->weight('bold'),
                        TextEntry::make('langganan.paketWifi.nama_paket')
                            ->label('Nama Paket')
                            ->weight('bold'),
                        TextEntry::make('tanggal_bayar')
                            ->label('Tanggal Pembayaran')
                            ->date(),
                        TextEntry::make('langganan.paketWifi.harga')
                            ->label('Harga Bulanan')
                            ->money('IDR'),
                        TextEntry::make('langganan.installation_cost')
                            ->label('Biaya Pemasangan')
                            ->money('IDR'),
                        TextEntry::make('total_pembayaran')
                            ->label('Total Pembayaran')
                            ->money('IDR'),
                        TextEntry::make('status_pembayaran')
                            ->label('Status Pembayaran')
                            ->badge()
                            ->icon(fn (string $state): string => match ($state) {
                                'Lunas' => 'heroicon-o-check-circle',
                                'Pending' => 'heroicon-o-exclamation-circle',
                                'Gagal' => 'heroicon-o-x-circle',
                                default => 'heroicon-o-minus-circle',
                            })
                            ->color(fn (string $state): string => match ($state) {
                                'Lunas' => 'success',
                                'Pending' => 'warning',
                                'Gagal' => 'danger',
                                default => 'gray',
                            }),

                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('nomor_pembayaran')
            ->columns([
                TextColumn::make('nomor_pembayaran')
                    ->searchable(),
                TextColumn::make('langganan.paketWifi.nama_paket')
                    ->label('Paket Langganan')
                    ->searchable(),
                TextColumn::make('tanggal_bayar')
                    ->date()
                    ->sortable(),
                TextColumn::make('total_pembayaran')
                    ->money('IDR')
                    ->sortable(),
                TextColumn::make('metode_pembayaran')
                    ->searchable(),
                TextColumn::make('status_pembayaran')
                    ->searchable(),
                TextColumn::make('status_pembayaran')
                    ->label('Status Pembayaran')
                    ->badge()
                    ->icon(fn (string $state): string => match ($state) {
                        'Lunas' => 'heroicon-o-check-circle',
                        'Pending' => 'heroicon-o-exclamation-circle',
                        'Gagal' => 'heroicon-o-x-circle',
                        default => 'heroicon-o-minus-circle',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'Lunas' => 'success',
                        'Pending' => 'warning',
                        'Gagal' => 'danger',
                        default => 'gray',
                    })
                    ->searchable(),
            ])
            ->filters([
                //
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
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DissociateBulkAction::make(),
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}

<?php

namespace App\Filament\Resources\PengaduanGangguans\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PengaduanGangguanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('kode_pengaduan')
                    ->disabled()
                    ->dehydrated(false)
                    ->placeholder('Otomatis dibuat sistem'),

                Select::make('id_pengguna')
                    ->label('Pelanggan')
                    ->relationship('pengguna', 'nama')
                    ->searchable()
                    ->preload()
                    ->required(),

                Select::make('id_teknisi')
                    ->label('Teknisi Bertugas')
                    ->relationship('teknisi', 'nama_teknisi')
                    ->searchable()
                    ->preload()
                    ->nullable(),

                Select::make('kategori_pengaduan')
                    ->label('Kategori Gangguan')
                    ->options([
                        'mati_total' => 'Mati Total',
                        'koneksi_lambat' => 'Koneksi Lambat',
                        'kabel_putus' => 'Kabel Putus',
                        'perangkat_rusak' => 'Perangkat Rusak',
                        'lainnya' => 'Lainnya',
                    ])
                    ->required()
                    ->default('lainnya'),

                Select::make('status_penanganan')
                    ->label('Status Penanganan')
                    ->options([
                        'pending' => 'Menunggu (Pending)',
                        'sedang_perjalanan' => 'Sedang Diproses / Perjalanan',
                        'selesai' => 'Selesai',
                    ])
                    ->required()
                    ->default('pending'),

                DateTimePicker::make('tanggal_pengaduan')
                    ->label('Waktu Pengaduan')
                    ->default(now()),

                Textarea::make('deskripsi_masalah')
                    ->label('Deskripsi Masalah')
                    ->required()
                    ->columnSpanFull(),

                FileUpload::make('foto_kendala')
                    ->label('Foto Bukti Kendala')
                    ->image()
                    ->directory('pengaduan')
                    ->columnSpanFull(),
            ]);
    }
}
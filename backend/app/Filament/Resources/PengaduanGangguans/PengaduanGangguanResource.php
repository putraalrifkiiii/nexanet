<?php

namespace App\Filament\Resources\PengaduanGangguans;

use App\Filament\Resources\PengaduanGangguans\Pages\CreatePengaduanGangguan;
use App\Filament\Resources\PengaduanGangguans\Pages\EditPengaduanGangguan;
use App\Filament\Resources\PengaduanGangguans\Pages\ListPengaduanGangguans;
use App\Filament\Resources\PengaduanGangguans\Pages\ViewPengaduanGangguan;
use App\Filament\Resources\PengaduanGangguans\Schemas\PengaduanGangguanForm;
use App\Filament\Resources\PengaduanGangguans\Schemas\PengaduanGangguanInfolist;
use App\Filament\Resources\PengaduanGangguans\Tables\PengaduanGangguansTable;
use App\Models\PengaduanGangguan;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PengaduanGangguanResource extends Resource
{
    protected static ?string $model = PengaduanGangguan::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Operasional & Transaksi';

    protected static ?string $recordTitleAttribute = 'kategori_pengaduan';

    public static function form(Schema $schema): Schema
    {
        return PengaduanGangguanForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PengaduanGangguanInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PengaduanGangguansTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPengaduanGangguans::route('/'),
            'create' => CreatePengaduanGangguan::route('/create'),
            'view' => ViewPengaduanGangguan::route('/{record}'),
            'edit' => EditPengaduanGangguan::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}

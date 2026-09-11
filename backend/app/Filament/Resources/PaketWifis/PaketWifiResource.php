<?php

namespace App\Filament\Resources\PaketWifis;

use App\Filament\Resources\PaketWifis\Pages\CreatePaketWifi;
use App\Filament\Resources\PaketWifis\Pages\EditPaketWifi;
use App\Filament\Resources\PaketWifis\Pages\ListPaketWifis;
use App\Filament\Resources\PaketWifis\Pages\ViewPaketWifi;
use App\Filament\Resources\PaketWifis\Schemas\PaketWifiForm;
use App\Filament\Resources\PaketWifis\Schemas\PaketWifiInfolist;
use App\Filament\Resources\PaketWifis\Tables\PaketWifisTable;
use App\Models\PaketWifi;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PaketWifiResource extends Resource
{
    protected static ?string $model = PaketWifi::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Manajemen Layanan';

    protected static ?string $recordTitleAttribute = 'nama_paket';

    public static function form(Schema $schema): Schema
    {
        return PaketWifiForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PaketWifiInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PaketWifisTable::configure($table);
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
            'index' => ListPaketWifis::route('/'),
            'create' => CreatePaketWifi::route('/create'),
            'view' => ViewPaketWifi::route('/{record}'),
            'edit' => EditPaketWifi::route('/{record}/edit'),
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

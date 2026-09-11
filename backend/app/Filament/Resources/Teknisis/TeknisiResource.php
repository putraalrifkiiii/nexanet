<?php

namespace App\Filament\Resources\Teknisis;

use App\Filament\Resources\Teknisis\Pages\CreateTeknisi;
use App\Filament\Resources\Teknisis\Pages\EditTeknisi;
use App\Filament\Resources\Teknisis\Pages\ListTeknisis;
use App\Filament\Resources\Teknisis\Pages\ViewTeknisi;
use App\Filament\Resources\Teknisis\Schemas\TeknisiForm;
use App\Filament\Resources\Teknisis\Schemas\TeknisiInfolist;
use App\Filament\Resources\Teknisis\Tables\TeknisisTable;
use App\Models\Teknisi;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TeknisiResource extends Resource
{
    protected static ?string $model = Teknisi::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Manajemen Pengguna';

    protected static ?string $recordTitleAttribute = 'nama_teknisi';

    public static function form(Schema $schema): Schema
    {
        return TeknisiForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return TeknisiInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TeknisisTable::configure($table);
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
            'index' => ListTeknisis::route('/'),
            'create' => CreateTeknisi::route('/create'),
            'view' => ViewTeknisi::route('/{record}'),
            'edit' => EditTeknisi::route('/{record}/edit'),
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

<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePengaduanGangguanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:pengguna,email',
            'kategori_pengaduan' => [
                'required',
                'in:mati_total,koneksi_lambat,kabel_putus,perangkat_rusak,lainnya',
            ],
            'deskripsi_masalah' => 'required|string',
        ];
    }
}

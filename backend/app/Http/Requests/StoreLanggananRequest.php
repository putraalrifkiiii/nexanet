<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreLanggananRequest extends FormRequest
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
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telepon' => 'required|string|max:15',
            'email' => 'required|email|unique:pengguna,email',
            'password' => 'required|string|min:8',
            'id_paket' => 'required|exists:paket_wifi,id',
        ];
    }
}

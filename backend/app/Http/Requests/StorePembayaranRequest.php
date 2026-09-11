<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePembayaranRequest extends FormRequest
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
            'id_langganan' => 'required|exists:langganan,id',
            'metode_pembayaran' => 'required|string|max:50',
            'bukti_pembayaran' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }
}

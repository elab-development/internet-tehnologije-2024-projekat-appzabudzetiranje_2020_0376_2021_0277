<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Assuming authorization is handled by middleware (e.g., Sanctum)
        // You might check if the authenticated user matches the payer_user_id here
        return true; 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['required', 'string', 'max:255'],
            'user_id' => ['required', 'exists:users,id'], // Ensure the payer exists
            'category_id' => ['nullable', 'exists:categories,id'],
            
            // Validation for the array of users involved (debtors)
            'debtors' => ['required', 'array', 'min:1'], // Must have at least one debtor
            'debtors.*.user_id' => ['required', 'distinct', 'exists:users,id'], // Ensure each user ID is unique and exists
            'debtors.*.amount_owed' => ['required', 'numeric', 'min:0.01'], // The amount owed must be a positive number
        ];
    }
}

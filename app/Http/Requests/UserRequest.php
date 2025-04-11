<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'email'       => 'required|string|max:255',
            'password'    => 'required|string|max:255',
            'password_confirmation'       => 'required|string|max:255',
            'is_admin'    => 'required|boolean',
        ];
    }

    /**
     * Function to get custom error messages
     */
    public function messages(): array
    {
        return [
            'name.required'        => 'Please enter the user name.',
            'name.string'          => 'user name must be a valid name.',
            'name.max'             => 'user name is too long.',
            'email.required'       => 'Please enter the user email.',
            'email.string'         => 'user email is invalid.',
            'email.max'            => 'user email is invalid.',
            'password.required'    => 'Please enter the user password.',
            'password.string'      => 'user password must be a valid string.',
            'password.max'         => 'user password is too long.',
            'password_confirmation.required' => 'Please confirm the user password.',
            'password_confirmation.string'   => 'Password confirmation must be a valid string.',
            'is_admin.required'    => 'Please specify if the user is an admin.',
            'is_admin.boolean'     => 'Admin field must be true or false.',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="CategoryRequest",
 *     type="object",
 *     required={"title"},
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         maxLength=255,
 *         example="Điện thoại",
 *         description="required:Tên danh mục là bắt buộc.|type:Tên danh mục phải là chuỗi .|max: Tên danh mục không vượt quá 255 ký tự."
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *         nullable=true,
 *         example="Danh mục sản phẩm công nghệ"
 *     )
 * )
 */
class CategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Tên danh mục là bắt buộc.',
            'title.string' => 'Tên danh mục phải là chuỗi.',
            'title.max' => 'Tên danh mục không vượt quá 255 ký tự.',
            'description.string' => 'Mô tả phải là chuỗi.',
        ];
    }
}

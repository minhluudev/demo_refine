<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *     schema="PostRequest",
 *     type="object",
 *     required={"title", "category_id"},
 *     @OA\Property(
 *         property="title",
 *         type="string",
 *         maxLength=255,
 *         example="Bài viết về công nghệ",
 *         description="Tiêu đề bài viết. Bắt buộc, tối đa 255 ký tự."
 *     ),
 *     @OA\Property(
 *         property="content",
 *         type="string",
 *         nullable=true,
 *         example="Nội dung chi tiết của bài viết.",
 *         description="Nội dung bài viết (không bắt buộc)."
 *     ),
 *     @OA\Property(
 *         property="category_id",
 *         type="integer",
 *         example=1,
 *         description="ID danh mục mà bài viết thuộc về. Bắt buộc, phải tồn tại trong bảng categories."
 *     )
 * )
 */
class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cho phép request này luôn được thực thi (nếu bạn không dùng policy)
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'category_id' => 'required|integer|exists:categories,id',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Tiêu đề là bắt buộc.',
            'title.string' => 'Tiêu đề phải là chuỗi.',
            'title.max' => 'Tiêu đề không được quá 255 ký tự.',
            'content.string' => 'Nội dung phải là chuỗi.',
            'category_id.required' => 'Danh mục là bắt buộc.',
            'category_id.integer' => 'ID danh mục phải là số nguyên.',
            'category_id.exists' => 'Danh mục được chọn không tồn tại.',
        ];
    }
}

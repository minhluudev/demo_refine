<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Category",
 *     type="object",
 *     title="Category",
 *     required={"title"},
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Điện thoại"),
 *     @OA\Property(property="description", type="string", example="Các loại điện thoại cao cấp"),
 *     @OA\Property(property="created_at", type="string", example="2025-10-24 09:30:00"),
 *     @OA\Property(property="updated_at", type="string", example="2025-10-24 09:35:00")
 * )
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}

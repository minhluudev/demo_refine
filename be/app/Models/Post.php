<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 *
 * @OA\Schema(
 *     schema="Post",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Hello World"),
 *     @OA\Property(property="content", type="string", example="This is a test post"),
 *     @OA\Property(property="category_id", type="integer", example=1),
 *     @OA\Property(
 *         property="category",
 *         ref="#/components/schemas/Category"
 *     )
 * )
 */
class Post extends Model
{
    use HasFactory;

    protected $fillable = ['category_id', 'title', 'content', 'tags'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

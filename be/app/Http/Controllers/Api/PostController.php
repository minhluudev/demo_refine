<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/posts",
     *     summary="Lấy danh sách bài viết (có phân trang)",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Số trang hiện tại (mặc định: 1)",
     *         required=false,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Số bài viết mỗi trang (mặc định: 15)",
     *         required=false,
     *         @OA\Schema(type="integer", example=15)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách bài viết (phân trang)",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="data",
     *                 type="array",
     *                 @OA\Items(ref="#/components/schemas/Post")
     *             ),
     *             @OA\Property(property="links", ref="#/components/schemas/PaginationLinks"),
     *             @OA\Property(property="meta", ref="#/components/schemas/PaginationMeta")
     *         )
     *     )
     * )
     */
    public function index()
    {
        // Lấy tham số từ query string, nếu không có thì dùng mặc định
        $page = request()->get('page', 1);       // trang hiện tại
        $perPage = request()->get('per_page', 10); // số bản ghi mỗi trang

        return PostResource::collection(Post::orderByDesc('id')->paginate($perPage, ['*'], 'page', $page));
    }

    /**
     * @OA\Post(
     *     path="/api/posts",
     *     summary="Tạo mới bài viết",
     *     tags={"Posts"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PostRequest")
     *     ),
     *     @OA\Response(response=201, description="Tạo bài viết thành công")
     * )
     */
    public function store(PostRequest $request)
    {
        $data = $request->validated();

        $post = Post::create($data);
        return response()->json($post, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/posts/{id}",
     *     summary="Xem chi tiết bài viết",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Chi tiết bài viết"),
     *     @OA\Response(response=404, description="Không tìm thấy")
     * )
     */
    public function show(Post $post)
    {
        return PostResource::make($post);
    }

    /**
     * @OA\Put(
     *     path="/api/posts/{id}",
     *     summary="Cập nhật bài viết",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PostRequest")
     *     ),
     *     @OA\Response(response=200, description="Cập nhật thành công")
     * )
     */
    public function update(PostRequest $request, Post $post)
    {
        $data = $request->validated();

        $post->update($data);
        return response()->json($post);
    }

    /**
     * @OA\Delete(
     *     path="/api/posts/{id}",
     *     summary="Xoá bài viết",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=204, description="Xoá thành công")
     * )
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}

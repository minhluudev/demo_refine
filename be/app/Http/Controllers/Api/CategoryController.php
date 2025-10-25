<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="Categories",
 *     description="API quản lý danh mục"
 * )
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/categories",
     *     summary="Lấy danh sách danh mục (có phân trang)",
     *     tags={"Categories"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Số trang (mặc định: 1)",
     *         required=false,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Parameter(
     *         name="per_page",
     *         in="query",
     *         description="Số phần tử mỗi trang (mặc định: 15)",
     *         required=false,
     *         @OA\Schema(type="integer", example=15)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Danh sách danh mục (phân trang)",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Category")),
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

        return CategoryResource::collection(Category::orderByDesc('id')->paginate($perPage, ['*'], 'page', $page));
    }

    /**
     * @OA\Post(
     *     path="/api/categories",
     *     summary="Tạo danh mục mới",
     *     tags={"Categories"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/CategoryRequest")
     *     ),
     *     @OA\Response(response=201, description="Tạo thành công", @OA\JsonContent(ref="#/components/schemas/Category")),
     *     @OA\Response(response=422, description="Lỗi validation")
     * )
     */
    public function store(CategoryRequest $request): JsonResponse
    {
        $category = Category::create($request->validated());
        return response()->json($category, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/categories/{id}",
     *     summary="Xem chi tiết danh mục",
     *     tags={"Categories"},
     *     @OA\Parameter(name="id", in="path", required=true, description="ID danh mục", @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Chi tiết danh mục", @OA\JsonContent(ref="#/components/schemas/Category")),
     *     @OA\Response(response=404, description="Không tìm thấy")
     * )
     */
    public function show(Category $category): JsonResponse
    {
        return response()->json($category);
    }

    /**
     * @OA\Put(
     *     path="/api/categories/{id}",
     *     summary="Cập nhật danh mục",
     *     tags={"Categories"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(required=true, @OA\JsonContent(ref="#/components/schemas/CategoryRequest")),
     *     @OA\Response(response=200, description="Cập nhật thành công", @OA\JsonContent(ref="#/components/schemas/Category")),
     *     @OA\Response(response=422, description="Lỗi validation")
     * )
     */
    public function update(CategoryRequest $request, Category $category): JsonResponse
    {
        $category->update($request->validated());
        return response()->json($category);
    }

    /**
     * @OA\Delete(
     *     path="/api/categories/{id}",
     *     summary="Xoá danh mục",
     *     tags={"Categories"},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Xoá thành công"),
     *     @OA\Response(response=404, description="Không tìm thấy")
     * )
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json(['message' => 'Xoá danh mục thành công']);
    }
}

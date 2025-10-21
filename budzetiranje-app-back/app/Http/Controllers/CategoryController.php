<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        // Fetches all categories. You can optionally select only ID and name
        $categories = Category::select('id', 'name')->get();

        return response()->json($categories);
    }
}

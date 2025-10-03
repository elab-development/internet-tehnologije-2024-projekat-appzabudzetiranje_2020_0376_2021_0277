<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title"=> "required|string|max:255",
            "slug"=> "required|string|max:100",
            "excerpt"=> "required",
            "body"=> "required",
            "category_id"=> "required",
        ]);

        if( $validator->fails() ){
            return response()->json($validator->errors());
        }

        $post = Post::create([
            "title"=> $request->title,
            "slug"=> $request->slug,
            "excerpt"=> $request->excerpt,
            "body"=> $request->body,
            "category_id"=> $request->category_id,
            "user_id" => Auth::user()->id
        ]);

        return response()->json(['Post is created successfully.', new PostResource($post)]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validator = Validator::make($request->all(), [
            "title"=> "required|string|max:255",
            "slug"=> "required|string|max:100",
            "excerpt"=> "required",
            "body"=> "required",
            "category_id"=> "required",
        ]);

        if( $validator->fails() ){
            return response()->json($validator->errors());
        }

        $post->title = $request->title;
        $post->slug = $request->slug;
        $post->excerpt = $request->excerpt;
        $post->body = $request->body;
        $post->category_id = $request->category_id;
        $post->save();

        return response()->json(["Post is updated!", new PostResource($post)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(["Post was deleted successfully"]);
    }
}

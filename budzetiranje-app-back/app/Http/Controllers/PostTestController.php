<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostTestController extends Controller
{
    public function index() {
        $posts = Post::all();
        return $posts;
        // $posts = Post::with(['category', 'user'])->get();
        // return PostResource::collection($posts);
    }

    public function show(Post $post) {
        return new PostResource($post);
        //  $post->load(['category', 'user']);
        // return new PostResource($post);
    }

    
}

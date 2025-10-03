<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'post';
    public function toArray($request) 
    {
        return [
            'id'=>$this->resource->id,
            'title'=>$this->resource->title,
            'category'=>$this->resource->category,
            // 'category' => $this->category ? $this->category->name : null,
            'body'=>$this->resource->body,
            // 'user' => $this->user ? $this->user->name : null,
            'user'=>$this->resource->user,
        ];
    }
}

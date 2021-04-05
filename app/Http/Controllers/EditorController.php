<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EditorController extends Controller
{
    public function decodedImage($image) {

        $exploded = explode(',', $image);

            $decoded = base64_decode($exploded[1]);

            if(str_contains($exploded[0], 'jpeg') || str_contains($exploded[0], 'jpg'))
                $extension = 'jpg';
            else if(str_contains($exploded[0], 'png'))
                $extension = 'png';
            else
                return response()->json([
                    'errors' => [
                        'image' => ['Invalid image file please use JPEG or PNG images only']
                    ]
                ], 422);

            $fileName = Str::random(15) . '.' . $extension;

            $path = public_path() . '\editor\\' . $fileName;

            file_put_contents($path, $decoded);

            $image_url = env('APP_URL') . '/editor' . '/' . $fileName;

            return $image_url;
    }

    public function imageUpload(Request $request) {

        // return $request->image;

        $validated = $request->validate([
            'image' => 'required'
        ]);

        $fileName = Str::random(14) . '.png';
        $path = public_path() . '\editor\\' . $fileName;
        $image_url = env('APP_URL') . '/editor' . '/' . $fileName;
        file_put_contents($path, $request->image);

        return response()->json(['url' => $image_url], 200);

        // return response()->json(['url' => $imageURL], 200);
    }
}

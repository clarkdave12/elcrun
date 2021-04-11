<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Support\Str;
use App\Models\Option;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OptionController extends Controller
{

    public function checkUserElection($user, $election) {

        if(!$election) {
            return response()->json(['message' => 'Election not found'], 404);
        }

        if($user->id != $election->user->id) {
            return response()->json(['message' => 'This election does not belongs the authenticated user'], 405);
        }
    }

    public function decodeImage($image) {

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

            $path = public_path() . '\images\\' . $fileName;

            file_put_contents($path, $decoded);

            $image_url = env('APP_URL') . '/images' . '/' . $fileName;

            return $image_url;
    }

    public function addOption(Request $request, $questionId) {

        $validated = $request->validate([
            'title' => 'required',
            'short_description' => 'required|max:200',
            'description' => '',
            'image' => ''
        ]);

        $validated['question_id'] = $questionId;

        if($validated['image'] != null) {

            $decodedImage = $this->decodeImage($validated['image']);

            $validated['image'] = $decodedImage;
        }

        $option = Option::create($validated);
        Result::create([
            'question_id' => $questionId,
            'option_id' => $option->id,
            'total' => 0
        ]);

        return response()->json([
            'message' => 'Created',
            'option' => $option
        ], 201);

    }

    public function updateOption(Request $request, $electionId, $optionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->first();
        $this->checkUserElection($user, $election);

        $validated = $request->validate([
            'title' => 'required',
            'short_description' => 'required|max:200',
            'description' => '',
            'image' => ''
        ]);

        $option = Option::where('id', $optionId)->first();

        $option->title = $validated['title'];
        $option->short_description = $validated['short_description'];
        $option->description = $validated['description'];

        if($validated['image'] != $option->image) {

            $decodedImage = $this->decodeImage($validated['image']);
            $option->image = $decodedImage;
        }

        $option->save();

        return response()->json([
            'message' => 'Updated',
            'updated' => $option
        ], 200);

    }

    public function deleteOption($electionId, $optionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->first();
        $this->checkUserElection($user, $election);

        $deleted = Option::where('id', $optionId)->delete();
        Result::where('option_id', $optionId)->delete();

        return response()->json([
            'message' => 'Option Deleted',
            'data' => $deleted
        ], 200);
    }
}

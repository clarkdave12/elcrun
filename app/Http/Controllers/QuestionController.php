<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuestionController extends Controller
{
    public function checkUserElection($user, $election) {

        if(!$election) {
            return response()->json(['message' => 'Election not found'], 404);
        }

        if($user->id != $election->user->id) {
            return response()->json(['message' => 'This election does not belongs the authenticated user'], 405);
        }
    }

    public function addQuestion(Request $request, $electionId) {

        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->first();
        $this->checkUserElection($user, $election);

        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'minimum' => 'required',
            'maximum' => 'required',
            'type' => ''
        ]);

        if($validated['minimum'] > $validated['maximum']) {
            return response()->json([
                'errors' => [
                    'options' => ['Then minimum can\'t be higher than maximum']
                ]
            ], 422);
        }

        $validated['election_id'] = $election->id;

        $question = Question::create($validated);

        return response()->json([
            'message' => 'Created',
            'question' => $question
        ], 201);

    }

    public function getQuestions($electionId) {
        // $user = Auth::user();
        // $election = Election::where('id', $electionId)->with('user')->with('questions')->first();
        // $this->checkUserElection($user, $election);

        $questions = Question::where('election_id', $electionId)->with('options')->get();

        return response()->json([
            'questions' => $questions
        ], 200);
    }

    public function updateQuestion(Request $request, $electionId, $questionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->with('questions')->first();
        $this->checkUserElection($user, $election);

        $validated = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'minimum' => 'required',
            'maximum' => 'required',
            'type' => ''
        ]);

        $question = Question::where('id', $questionId)->first();

        $updated = $question->update($validated);

        return response()->json([
            'message' => 'Updated',
            'updates' => $updated
        ], 200);
    }

    public function deleteQuestion($electionId, $questionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->with('questions')->first();
        $this->checkUserElection($user, $election);

        $deleted = Question::where('id', $questionId)->delete();

        $deleted = Option::where('question_id', $questionId)->delete();

        return response()->json([
            'message' => 'Deleted',
            'deletes' => $deleted
        ], 200);
    }

    public function clearOptions($electionId, $questionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->with('questions')->first();
        $this->checkUserElection($user, $election);

        $deleted = Option::where('question_id', $questionId)->delete();

        return response()->json([
            'message' => 'Deleted',
            'deletes' => $deleted
        ], 200);
    }
}

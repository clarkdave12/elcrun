<?php

namespace App\Http\Controllers;

use App\Models\Achoice;
use App\Models\Election;
use App\Models\ElectionStatus;
use App\Models\Option;
use App\Models\Question;
use App\Models\Result;
use App\Models\User;
use App\Models\Voter;
use App\Models\Votes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ElectionController extends Controller
{

    public function checkUserElection($user, $election) {

        if(!$election) {
            return response()->json(['message' => 'Election not found'], 404);
        }

        if($user->id != $election->user->id) {
            return response()->json(['message' => 'This election does not belongs the authenticated user'], 405);
        }
    }

    public function addElection(Request $request) {

        $validated = $request->validate([
            'title' => 'required|unique:elections',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'election_url' => 'required',
            'short_url' => 'required',
            'preview_url' => 'required'
        ]);

        $user = Auth::user();
        $status = ElectionStatus::where('name', 'building')->first();

        $validated['user_id'] = $user->id;
        $validated['election_status_id'] = $status->id;

        $election = Election::create($validated);

        $election->election_url = env('APP_URL') . '/vote' . '/' . $election->id;
        $election->short_url = env('APP_URL') . '/vote' . '/' . $election->id;

        $election->save();

        return response()->json([
            'message' => 'Election created successfully',
            'data' => $election
        ], 201);
    }

    public function duplicateElection($electionId) {
        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->first();
        $this->checkUserElection($user, $election);

        $election = Election::where('id', $electionId)->first();
        $election->title = '(COPY) ' . $election->title;

        $newElection = Election::create([
            'title' => $election->title,
            'start_date' => $election->start_date,
            'end_date' => $election->end_date,
            'short_url' => $election->short_url,
            'election_url' => $election->election_url,
            'preview_url' => $election->preview_url,
            'user_id' => $election->user_id,
            'election_status_id' => $election->election_status_id
        ]);

        $newElection->short_url = env('APP_URL') . '/vote' . '/' . $newElection->id;
        $newElection->election_url = env('APP_URL') . '/vote' . '/' . $newElection->id;
        $newElection->save();

        $questions = Question::where('election_id', $election->id)->with('options')->get();

        foreach($questions as $question) {
            $newQuestion = Question::create([
                'title' => $question->title,
                'description' => $question->description,
                'minimum' => $question->minimum,
                'maximum' => $question->maximum,
                'election_id' => $newElection->id
            ]);

            foreach($question->options as $option) {
                Option::create([
                    'title' => $option->title,
                    'short_description' => $option->short_description,
                    'description' => $option->description,
                    'image' => $option->image,
                    'question_id' => $newQuestion->id
                ]);
            }
        }

        $resultElection = $newElection;
        $resultQuestions = Question::where('election_id', $newElection->id)->with('options')->get();

        return response()->json([
            'election' => $resultElection,
            'questions' => $resultQuestions
        ], 201);
    }

    public function getElections() {

        $elections = Election::where('user_id', Auth::user()->id)->with('election_status')->get();

        return response()->json([
            'elections' => $elections
        ], 200);
    }

    public function getElectionById($id) {

        $election = Election::where('id', $id)->with('election_status')
        ->first();

        return response()->json(['election' => $election], 200);
    }


    public function getElectionResult($electionId) {

        $election = Election::where('id', $electionId)->with('questions')->first();

        $questions = Question::where('election_id', $electionId)->with('options')->get();

        foreach($questions as $question) {
            foreach($question->options as $option) {
                $temp = Result::where('option_id', $option->id)->first();
                $option->votes = $temp->total;
            }
        }

        return response()->json([
            'result' => $questions
        ], 200);
    }

    public function getVoterParticipation($electionId) {
        $election = Election::where('id', $electionId)->with('voters')->first();

        $totalVoters = $election->voters->count();

        $participated = Votes::where('election_id', $electionId)->get();

        $totalVotes = $participated->count();

        $notVoted = $totalVoters - $totalVotes;

        return response()->json([
            'not_voted' => $notVoted,
            'voted' => $totalVotes
        ], 200);
    }


    public function deleteElection($electionId) {

        $user = Auth::user();
        $election = Election::where('id', $electionId)->with('user')->first();
        if(!$election) {
            return response()->json([
                'message' => 'No Election Found!'
            ], 404);
        }
        $this->checkUserElection($user, $election);

        $voters = Voter::where('election_id', $election->id)->delete();

        $questions = Question::where('election_id', $election->id)->with('options')->delete();

        $deleted = $election->delete();

        return response()->json([
            'election_deleted' => $deleted,
            'questions_deleted' => $questions,
            'voters_deleted' => $voters
        ], 200);
    }

}

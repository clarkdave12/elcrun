<?php

namespace App\Http\Controllers;

use App\Models\Achoice;
use App\Models\Aquestion;
use App\Models\Election;
use App\Models\Question;
use App\Models\Result;
use App\Models\Voter;
use App\Models\Votes;
use Illuminate\Http\Request;

class VoteProcessController extends Controller
{
    public function authenticateVoter(Request $request) {

        $validated = $request->validate([
            'key' => ''
        ]);

        $voter = Voter::where('comp_key', $validated['key'])->first();

        if(!$voter) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        return response()->json([
            'voter' => $voter
        ], 200);

    }

    public function login(Request $request, $electionId) {

        $election = Election::where('id', $electionId)->with('voters')->first();

        if(!$election) {
            return response()->json([
                'errors' => [
                    'message' => 'No such election'
                ]
            ], 404);
        }

        $validated = $request->validate([
            'voter_id' => 'required',
            'voter_key' => 'required'
        ]);

        $voter = $election->voters
            ->where('voter_id', $validated['voter_id'])
            ->where('voter_key', $validated['voter_key'])
            ->first();

        if(!$voter)
            return response()->json([
                'errors' => [
                    'message' => 'Invalid voter credentials'
                ]
            ], 401);

        $voted = Votes::where(['voter_id' => $voter->id, 'election_id' => $election->id])->first();

        if($voted) {
            return response()->json([
                'errors' => [
                    'message' => 'Already voted'
                ]
            ], 405);
        }

        return response()->json([
            'voter' => $voter
        ], 200);

    }

    public function submitBallot(Request $request, $electionId) {

        $data = json_decode($request->getContent(), true);

        $fingerprint = $data['fingerprint'];

        $voter = Voter::where('comp_key', $fingerprint)->first();

        $vote = Votes::create([
            'voter_id' => $voter->id,
            'election_id' => $electionId,
            'checksum' => 'temp'
        ]);

        $vote->checksum = bcrypt($vote->id . $vote->voter_id . $vote->election_id);
        $vote->save();

        foreach($data['questions'] as $q) {
            $aq = Aquestion::create([
                'title' => $q['title'],
                'description' => $q['description'],
                'minimum' => $q['minimum'],
                'maximum' => $q['maximum'],
                'type' => '',
                'voted_id' => $vote->id
            ]);

            $options = $q['options'];

            foreach($options as $option) {

                Achoice::create([
                    'title' => $option['title'],
                    'short_description' => $option['short_description'],
                    'description' => $option['description'],
                    'image' => $option['image'],
                    'type' => '',
                    'chosen' => $option['chosen'],
                    'aquestion_id' => $aq->id
                ]);

            }

        }

        // Update Result
        foreach($data['questions'] as $question) {
            $options = $question['options'];
            foreach($options as $option) {
                if($option['chosen']) {

                    $choice = Result::where('question_id', $question['id'])
                                ->where('option_id', $option['id'])
                                ->first();
                    $choice['total'] = $choice['total'] + 1;
                    $choice->save();
                }
            }
        }


        $election = Election::where('id', $electionId)->first();


        return response()->json([
            'voted' => $vote,
            'election' => $election
        ], 200);


        // return $vote;
    }

    public function getVoteHistory(Request $request) {

        $validated = $request->validate([
            'receipt_number' => 'required'
        ]);

        $voted = Votes::where('checksum', $validated['receipt_number'])->with('aquestions')->first();

        $questions = Aquestion::where('voted_id', $voted->id)->with('achoices')->get();

        $voted->aquestions;

        // return $voted->aquestions->with('achoices');

        return response()->json([
            'questions' => $questions
        ], 200);

    }
}

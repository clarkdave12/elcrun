<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\Voter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoterController extends Controller
{

    public function checkUserElection($user, $election) {

        if(!$election) {
            return response()->json(['message' => 'Election not found'], 404);
        }

        if($user->id != $election->user->id) {
            return response()->json(['message' => 'This election does not belongs the authenticated user'], 405);
        }
    }

    public function addVoter(Request $request, $electionId) {

        $user = Auth::user();

        // Optional "vote_weight"

        $validated = $request->validate([
            'name' => 'required|max:150',
            'voter_id' => 'required',
            'voter_key' => 'required',
            'email' => 'required|email',
            'vote_weight' => ''
        ]);

        $election = Election::where('id', $electionId)->with('user')->first();

        $this->checkUserElection($user, $election);

        $validated['election_id'] = $election->id;
        $validated['comp_key'] = '1';
        $voter = Voter::create($validated);

        $voter->comp_key = bcrypt($voter->id . '-' . $voter->voter_id);

        $voter->save();

        return response()->json(['message' => 'Voter registered Successfully', 'voter' => $voter], 201);
    }

    public function getVoters($electionId) {

        $user = Auth::user();

        $election = Election::where('id', $electionId)->with(['voters', 'user'])->first();

        $this->checkUserElection($user, $election);

        return response()->json(['voters' => $election->voters], 200);
    }

    public function updateVoter(Request $request, $electionId) {

        $user = Auth::user();

        $election = Election::where('id', $electionId)->with(['voters', 'user'])->first();

        $this->checkUserElection($user, $election);

        $validated = $request->validate([
            'id' => 'required',
            'name' => 'required|max:150',
            'voter_id' => 'required',
            'voter_key' => 'required',
            'email' => 'required|email',
            'comp_key' => 'required'
        ]);

        $voter = Voter::where('id', $validated['id'])->first();

        $updated = $voter->update([
            'name' => $validated['name'],
            'voter_id' => $validated['voter_id'],
            'voter_key' => $validated['voter_key'],
            'email' => $validated['email'],
            'comp_key' => $validated['comp_key']
        ]);

        return response()->json([
            'message' => 'Updated!',
            'data' => $updated
        ], 200);
    }

    public function deleteVoter($electionId, $id) {

        $user = Auth::user();
        $election = Election::where('id', $electionId)->with(['voters', 'user'])->first();
        $this->checkUserElection($user, $election);

        $deleted = Voter::where('id', $id)->delete();

        return response()->json([
            'message' => 'Deleted!',
            'data' => $deleted
        ], 200);

    }
}

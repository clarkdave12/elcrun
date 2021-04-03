<?php

namespace App\Http\Controllers;

use App\Models\Election;
use Illuminate\Http\Request;

class VoteProcessController extends Controller
{
    public function login(Request $request, $electionId) {

        $election = Election::where('id', $electionId)->with('voters')->first();

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

        return response()->json([
            'voter' => $voter
        ], 200);

    }
}

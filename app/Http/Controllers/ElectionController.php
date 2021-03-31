<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\ElectionStatus;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ElectionController extends Controller
{

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

        Election::create($validated);

        return response()->json([
            'message' => 'Election created successfully',
            'data' => $validated
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
}

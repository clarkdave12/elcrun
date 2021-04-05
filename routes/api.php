<?php

use App\Http\Controllers\EditorController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteProcessController;
use App\Http\Controllers\VoterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/get_current_user', [UserController::class, 'getCurrentUser'])->middleware('auth:api');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/editor_upload', [EditorController::class, 'imageUpload']);

Route::post('/elections', [ElectionController::class, 'addElection'])->middleware('auth:api');
Route::get('/elections', [ElectionController::class, 'getElections'])->middleware('auth:api');
Route::get('/elections/{id}', [ElectionController::class, 'getElectionById'])->middleware('auth:api');

Route::post('/voters/{electionId}', [VoterController::class, 'addVoter'])->middleware('auth:api');
Route::get('/voters/{electionId}', [VoterController::class, 'getVoters'])->middleware('auth:api');
Route::put('/voters/{electionId}', [VoterController::class, 'updateVoter'])->middleware('auth:api');
Route::delete('/voters/{electionId}/{id}', [VoterController::class, 'deleteVoter'])->middleware('auth:api');

Route::post('/ballot/{electionId}', [QuestionController::class, 'addQuestion'])->middleware('auth:api');
Route::get('/ballot/{electionId}', [QuestionController::class, 'getQuestions'])->middleware('auth:api');
Route::put('/ballot/{electionId}/{questionId}', [QuestionController::class, 'updateQuestion'])->middleware('auth:api');
Route::delete('/ballot/{electionId}/{questionId}', [QuestionController::class, 'deleteQuestion'])->middleware('auth:api');
Route::delete('/ballot/clear_options/{electionId}/{questionId}', [QuestionController::class, 'clearOptions'])->middleware('auth:api');

Route::post('/question/option/{questionId}', [OptionController::class, 'addOption'])->middleware('auth:api');
Route::put('/question/option/{electionId}/{optionId}', [OptionController::class, 'updateOption'])->middleware('auth:api');
Route::delete('/question/option/{electionId}/{optionId}', [OptionController::class, 'deleteOption'])->middleware('auth:api');

Route::post('/votes/authenticate_voter', [VoteProcessController::class, 'authenticateVoter']);

Route::post('/votes/{electionId}', [VoteProcessController::class, 'login']);
Route::post('/submitBallot/{electionId}', [VoteProcessController::class, 'submitBallot']);
Route::post('/get_vote_history', [VoteProcessController::class, 'getVoteHistory']);

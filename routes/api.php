<?php

use App\Http\Controllers\ElectionController;
use App\Http\Controllers\UserController;
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


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/elections', [ElectionController::class, 'addElection'])->middleware('auth:api');
Route::get('/elections', [ElectionController::class, 'getElections'])->middleware('auth:api');

Route::post('/get_current_user', [UserController::class, 'getCurrentUser'])->middleware('auth:api');

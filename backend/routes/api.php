<?php

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tasks', [TaskController::class, 'list']);
Route::get('/tasks/{id}', [TaskController::class, 'show'])->where('id', '[0-9]+');
Route::post('/tasks', [TaskController::class, 'create']);
Route::delete('/tasks/{id}', [TaskController::class, 'delete'])->where('id', '[0-9]+');
Route::patch('/tasks/{id}', [TaskController::class, 'update']);

Route::get('/categories', [CategoryController::class, 'list']);
Route::get('/categories/{id}', [CategoryController::class, 'show'])->where('id', '[0-9]+');
Route::post('/categories', [CategoryController::class, 'create']);
Route::delete('/categories/{id}', [CategoryController::class, 'delete'])->where('id', '[0-9]+');
Route::patch('/categories/{id}', [CategoryController::class, 'update']);

Route::get('/tags', [TagController::class, 'list']);
Route::get('/tags/{id}', [TagController::class, 'show'])->where('id', '[0-9]+');
Route::post('/tags', [TagController::class, 'create']);
Route::delete('/tags/{id}', [TagController::class, 'delete'])->where('id', '[0-9]+');
Route::patch('/tags/{id}', [TagController::class, 'update']);

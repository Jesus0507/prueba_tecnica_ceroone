<?php
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(PostController::class) -> group(function() {
    Route::get('/contacts','getContacts');
    Route::get('/invoices','getInvoices');
    Route::get('/accounts','getAccounts');
    Route::get('/purchase','getPurchase');
});

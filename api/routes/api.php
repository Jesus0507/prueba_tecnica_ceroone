<?php
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(PostController::class) -> group(function() {
    Route::get('/contacts','getContacts')->name('contactsRequest');
    Route::get('/invoices','getInvoices')->name('invoicesRequest');
    Route::get('/accounts','getAccounts')->name('accountsRequest');;
    Route::get('/purchase','getPurchase')->name('purchaseRequest');
});

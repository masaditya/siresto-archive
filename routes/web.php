<?php

use App\Http\Controllers\RestorationController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\RestorationManagementController;

Route::get('/', [RestorationController::class, 'index'])->name('home');
Route::get('/pengajuan', [RestorationController::class, 'pengajuan'])->name('pengajuan');
Route::get('/upload', [RestorationController::class, 'upload'])->name('upload');
Route::get('/tracking', [RestorationController::class, 'trackingPage'])->name('tracking.index');


Route::post('/submission', [RestorationController::class, 'storeSubmission'])->name('submission.store');
Route::post('/upload-documents', [RestorationController::class, 'uploadDocuments'])->name('documents.upload');
Route::get('/api/tracking/{resi}', [RestorationController::class, 'trackDetails'])->name('api.tracking.details');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/restorations', [RestorationManagementController::class, 'index'])->name('restorations.index');
        Route::post('/restorations/{restorationRequest}/update-progress', [RestorationManagementController::class, 'updateProgress'])->name('restorations.update-progress');
    });
});

require __DIR__.'/settings.php';

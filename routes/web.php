<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('patients', function () {
        return Inertia::render('patients');
    })->name('patients');
    
    Route::get('appointments', function () {
        return Inertia::render('appointments');
    })->name('appointments');

    Route::get('prescriptions', function () {
        return Inertia::render('prescriptions');
    })->name('prescriptions');

    Route::get('exams', function () {
        return Inertia::render('exams');
    })->name('exams');

    Route::get('vaccines', function () {
        return Inertia::render('vaccines');
    })->name('vaccines');

    Route::get('medications', function () {
        return Inertia::render('medications');
    })->name('medications');

    Route::get('reports', function () {
        return Inertia::render('reports');
    })->name('reports');

    Route::get('employees', function () {
        return Inertia::render('employees');
    })->name('employees');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

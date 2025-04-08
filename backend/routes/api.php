<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SanPhamController;

Route::get('/sanpham', [SanPhamController::class, 'index']);

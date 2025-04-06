<?php
use App\Http\Controllers\SanPhamController;

Route::get('/api/sanpham', [SanPhamController::class, 'index']);


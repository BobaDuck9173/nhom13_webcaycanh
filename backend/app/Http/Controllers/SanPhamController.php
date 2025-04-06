<?php

namespace App\Http\Controllers;

use App\Models\SanPham;

class SanPhamController extends Controller
{
    public function index()
    {
        $sanpham = SanPham::with('danhMuc')->get();

        $sanpham = $sanpham->map(function ($sp) {
            return [
                'ma_san_pham' => $sp->ma_san_pham,
                'ten_san_pham' => $sp->ten_san_pham,
                'gia_san_pham' => $sp->gia_san_pham,
                'hinh_san_pham' => $sp->hinh_san_pham,
                'ma_danh_muc' => $sp->ma_danh_muc,
                'ten_danh_muc' => optional($sp->danhMuc)->ten_danh_muc ?? 'Không xác định',
            ];
        });

        return response()->json($sanpham);
    }
}

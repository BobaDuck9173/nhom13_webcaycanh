<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DanhMucSanPham extends Model
{
    protected $table = 'danhmucsanpham';
    protected $primaryKey = 'ma_danh_muc';
    public $timestamps = false;
    protected $keyType = 'string'; // <--- QUAN TRỌNG
    public $incrementing = false;

    protected $fillable = ['ten_danh_muc'];
}

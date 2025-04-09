import React, { useState } from "react";
import { toast } from "react-toastify";

const ThanhToan = () => {
  const gioHang = JSON.parse(localStorage.getItem("gioHang")) || [];
  const tongSoLuong = gioHang.reduce((tong, sp) => tong + sp.quantity, 0);
  const tongTien = gioHang.reduce((tong, sp) => tong + sp.quantity * sp.gia_san_pham, 0);

  const [ten, setTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [thanhToan, setThanhToan] = useState("COD");

  const handleDatHang = async () => {
    if (!ten || !email || !sdt || !diaChi) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const thongTinKhachHang = { ten, email, sdt, diaChi, thanhToan };

    try {
      const res = await fetch("http://localhost:8080/api/dat-hang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thongTinKhachHang, gioHang, tongTien }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Đặt hàng thành công!");
        localStorage.removeItem("gioHang");
        window.location.href = "/";
      } else {
        toast.error("Đặt hàng thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Lỗi kết nối tới server!");
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Chi tiết giỏ hàng */}
        <div className="col-md-7">
          <h4 className="mb-3">Chi Tiết Giỏ Hàng</h4>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Hình Ảnh</th>
                <th>Tên Sách</th>
                <th>Giá</th>
                <th>Số Lượng</th>
                <th>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              {gioHang.map((sp, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000/images/${sp.hinh_san_pham}.jpg`}
                      alt={sp.ten_san_pham}
                      width="50"
                    />
                  </td>
                  <td>{sp.ten_san_pham}</td>
                  <td>{Number(sp.gia_san_pham).toLocaleString()} VNĐ</td>
                  <td>{sp.quantity}</td>
                  <td>{(sp.gia_san_pham * sp.quantity).toLocaleString()} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3">
            <p><strong>Tổng Số Lượng:</strong> {tongSoLuong}</p>
            <p><strong>Phí Vận Chuyển:</strong> 0 VNĐ</p>
            <p><strong>Tổng Cộng:</strong> {tongTien.toLocaleString()} VNĐ</p>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn w-50 text-success border-0 fw-semibold"
              style={{
                background: "transparent",
                transition: "all 0.3s ease", 
              }}
              onClick={() => (window.location.href = "/gio-hang")}
              onMouseEnter={(e) => {
                e.target.style.color = "#218838"; 
                e.target.style.transform = "scale(1.05)"; 
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#28a745";
                e.target.style.transform = "scale(1)"; 
              }}
            >
              ← Quay lại giỏ hàng
            </button>
          </div>


        </div>

        {/* Thông tin hóa đơn */}
        <div className="col-md-5">
          <h4 className="mb-3">1. THÔNG TIN HÓA ĐƠN</h4>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Họ Tên"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Số Điện Thoại"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Địa Chỉ"
            value={diaChi}
            onChange={(e) => setDiaChi(e.target.value)}
          />

          <div className="mb-3">
            <label className="d-block mb-2">Phương Thức Thanh Toán:</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="thanhToan"
                value="COD"
                checked={thanhToan === "COD"}
                onChange={(e) => setThanhToan(e.target.value)}
              />
              <label className="form-check-label">Thanh toán khi nhận hàng (COD)</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="thanhToan"
                value="MoMo"
                checked={thanhToan === "MoMo"}
                onChange={(e) => setThanhToan(e.target.value)}
              />
              <label className="form-check-label">Thanh toán qua MoMo</label>
            </div>
          </div>

          <button className="btn btn-primary w-100" onClick={handleDatHang}>
            Đặt Hàng
          </button>

        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
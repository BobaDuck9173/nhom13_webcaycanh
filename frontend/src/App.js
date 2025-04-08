import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import GioHang from "./GioHang";
import { useCart } from "./CartContext";
import GioiThieu from "./GioiThieu";
// Trang chủ
const HomePage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("✅ Đã thêm vào giỏ hàng!");
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/sanpham")
      .then((res) => {
        const products = res.data;
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const top8 = shuffled.slice(0, 8);
        setHotProducts(top8);

        const grouped = {};
        products.forEach((product) => {
          const category = product.ten_danh_muc;
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push(product);
        });
        setGroupedProducts(grouped);
        setLoading(false);
      })
      .catch(() => {
        setError("Không thể tải sản phẩm.");
        setLoading(false);
      });
  }, []);

  const chunkArray = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  if (loading) return <div className="container text-center mt-4">Đang tải...</div>;
  if (error) return <div className="container text-center mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      {/* Danh mục + Slide */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="category-box shadow-sm">
            <h5 className="text-success mb-3">DANH MỤC SẢN PHẨM</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Cây Để Bàn</li>
              <li className="list-group-item">Cây Sen Đá</li>
              <li className="list-group-item">Cây Xương Rồng</li>
              <li className="list-group-item">Cây Bonsai</li>
              <li className="list-group-item">Chậu Cây</li>
              <li className="list-group-item">Đất Trồng Cây</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div
            id="carouselExampleIndicators"
            className="carousel slide rounded-4 overflow-hidden"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/slides/slide1.jpg" className="d-block w-100 slide-img" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src="/slides/slide2.jpg" className="d-block w-100 slide-img" alt="Slide 2" />
              </div>
              <div className="carousel-item">
                <img src="/slides/slide3.jpg" className="d-block w-100 slide-img" alt="Slide 3" />
              </div>
            </div>
            <button className="carousel-control-prev custom-arrow" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon custom-icon"></span>
            </button>
            <button className="carousel-control-next custom-arrow" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon custom-icon"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Sản phẩm bán chạy */}
      <div className="mb-5">
        <h3 className="text-danger mb-4 text-center fw-bold">🔥 Sản phẩm bán chạy</h3>
        <div id="hotProductCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {chunkArray(hotProducts, 4).map((group, index) => (
              <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                <div className="row">
                  {group.map((product) => (
                    <div className="col-md-3 mb-3" key={product.ma_san_pham}>
                      <div className="card h-100">
                        <img
                          src={`http://127.0.0.1:8000/images/${product.hinh_san_pham}.jpg`}
                          className="card-img-top product-img"
                          alt={product.ten_san_pham}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">{product.ten_san_pham}</h5>
                          <p className="text-danger">
                            {Number(product.gia_san_pham).toLocaleString("vi-VN")}đ
                          </p>
                          <button className="btn btn-outline-danger" onClick={() => handleAddToCart(product)}>
                            Thêm vào giỏ hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#hotProductCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#hotProductCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Sản phẩm theo danh mục */}
      {Object.entries(groupedProducts).map(([categoryName, products]) => (
        <div key={categoryName} className="mb-5">
          <h3 className="text-success mb-3">{categoryName}</h3>
          <div className="row">
            {products.map((product) => (
              <div key={product.ma_san_pham} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={`http://127.0.0.1:8000/images/${product.hinh_san_pham}.jpg`}
                    className="card-img-top product-img"
                    alt={product.ten_san_pham}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.ten_san_pham}</h5>
                    <p className="text-danger">
                      {Number(product.gia_san_pham).toLocaleString("vi-VN")}đ
                    </p>
                    <button className="btn btn-success" onClick={() => handleAddToCart(product)}>
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// App component
const App = () => {

  const { totalItems } = useCart();  // Lấy totalItems từ CartContext

  return (  // Phải có return JSX

    <>

      {/* Top bar */}
      <div className="top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="left-info">📢 Nhóm 13</div>
          <div className="center-phone text-center flex-grow-1">📞 0909 123 456</div>
          <div className="right-links">
            <a href="#">Đăng nhập</a>
            <a href="#">Đăng ký</a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-green-fresh p-3">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
              <img src="/logo/logo.jpg" alt="Logo" height="100" />
            </Link>
            <span
              className="text-success fw-bold fs-4 ms-5 d-flex align-items-center"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              Thế giới cây cảnh - Đến là mua
            </span>
          </div>

          <div className="d-flex align-items-center gap-3 w-50">
            <div className="input-group w-100">
              <input
                type="search"
                className="form-control"
                placeholder="Tìm kiếm..."
                aria-label="Tìm kiếm"
              />
              <span className="input-group-text text-white" style={{ backgroundColor: "#28a745" }}>
                <i className="bi bi-search"></i>
              </span>
            </div>

            <Link to="/gio-hang" className="btn position-relative gio-hang-btn">
              <span className="cart-icon">🛒</span>
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-badge"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Menu ngang */}
      <div className="shadow-sm">
        <div className="container menu-bar">
          <ul className="nav justify-content-between py-2">
            <li className="nav-item flex-fill text-center">
              <Link className="nav-link menu-link active" to="/">TRANG CHỦ</Link>
            </li>
            <li className="nav-item flex-fill text-center">
              <Link className="nav-link menu-link" to="/gioi-thieu">GIỚI THIỆU</Link>
            </li>
            <li className="nav-item flex-fill text-center">
              <a className="nav-link menu-link" href="#">LIÊN HỆ</a>
            </li>
            <li className="nav-item flex-fill text-center">
              <a className="nav-link menu-link" href="#">TIN TỨC</a>
            </li>
            <li className="nav-item flex-fill text-center">
              <a className="nav-link menu-link" href="#">HỎI ĐÁP</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Route nội dung */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gio-hang" element={<GioHang />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
      </Routes>
    </>
  );
};

export default App;

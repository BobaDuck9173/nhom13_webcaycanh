import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import GioHang from "./GioHang";
import GioiThieu from "./GioiThieu";
import Authentication from "./Authentication";
import CustomToast from "./CustomToast";
import ThanhToan from "./ThanhToan";  
import HoiDap from "./HoiDap";
import TinTuc from "./TinTuc";
import TinTucDetail from './TinTucDetail';

const App = () => {
  return (
    <><Routes>
      {/* Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainLayout />} />
        <Route path="/gio-hang" element={<GioHang />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/hoi-dap" element={<HoiDap />} />
        <Route path="/tin-tuc" element={<TinTuc />} />
        <Route path="/tin-tuc/:id" element={<TinTucDetail />} />
      </Route>

      <Route element={<Authentication />}>
        <Route path="/dang-nhap" element={<Authentication />} />
        <Route path="/dang-ky" element={<Authentication />} />
      </Route>
    </Routes>
    <CustomToast /></>
  );
};

export default App;
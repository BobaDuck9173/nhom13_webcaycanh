import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

const Authentication = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up

    // Determine the mode based on the current route
    useEffect(() => {
        if (location.pathname === "/dang-ky") {
            setIsLogin(false); // Switch to Sign Up mode
        } else {
            setIsLogin(true); // Default to Login mode
        }
    }, [location]);

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#f8f9fa" }}
        >
            <div
                className="shadow-lg rounded p-4"
                style={{ width: "400px", backgroundColor: "#fff" }}
            >
                <h3 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h3>
                <form>
                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Enter your full name"
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            {isLogin ? "Username" : "Email"}
                        </label>
                        <input
                            type={isLogin ? "text" : "email"}
                            className="form-control"
                            id="email"
                            placeholder={isLogin ? "Enter your username" : "Enter your email"}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-3">
                            <label htmlFor="rePassword" className="form-label">
                                Re-enter Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="rePassword"
                                placeholder="Re-enter your password"
                            />
                        </div>
                    )}
                    <button type="submit" className="btn btn-success w-100 mt-2">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="text-center my-2">or</div>
                <button
                    className="btn w-100"
                    style={{
                        backgroundColor: "#f8f9fa",
                        color: "#000",
                        border: "1px solid #dcdcdc", // Add a border
                        transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e0e0e0")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f8f9fa")}
                >
                    {isLogin ? "Login with Google" : "Sign Up with Google"}
                </button>
                <div className="text-center mt-3">
                    {isLogin ? (
                        <>
                            <span>Doesn't have an account? </span>
                            <button
                                className="btn btn-link p-0"
                                style={{ fontWeight: "600", textDecoration: "none", color: "#28a745" }}
                                onClick={() => {
                                    // Navigate to /dang-ky for Sign Up
                                    window.location.href = "/dang-ky";
                                }}
                            >
                                Sign Up for free
                            </button>
                        </>
                    ) : (
                        <>
                            <span>Already have an account? </span>
                            <button
                                className="btn btn-link p-0"
                                style={{ fontWeight: "600", textDecoration: "none", color: "#28a745" }}
                                onClick={() => {
                                    // Navigate to /dang-nhap for Sign In
                                    window.location.href = "/dang-nhap";
                                }}
                            >
                                Login here
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Authentication;
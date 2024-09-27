import React, { useState, useEffect } from "react";
import "./SignInPage.scss";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = email && password;
    setIsFormValid(isFormValid);
  }, [email, password]);

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    if (isFormValid) {
      // Thay vì call API, có thể thêm các logic khác như điều hướng trang
      console.log("Đăng nhập thành công");
    }
  };

  return (
    <div className="container px-5">
      <div className="signup_header">
        <span
          className="link-homepage"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          Trang chủ
        </span>
        <p>/</p>
        <p style={{ color: "rgb(191, 191, 191)" }}>Đăng nhập</p>
      </div>

      <div className="heading-bar text-center py-5">
        <h1 style={{ fontSize: "25px" }}>ĐĂNG NHẬP TÀI KHOẢN</h1>
        <p>
          Bạn chưa có tài khoản? Đăng ký
          <span
            className="link-signup px-2"
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            tại đây
          </span>
        </p>
      </div>

      <div className="formSignup">
        <form>
          <div className="form-Signup-Input">
            <label>
              Email<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleOnchangeEmail}
            />
          </div>
          <div className="form-Signup-Input">
            <label>
              Mật khẩu<span>*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={handleOnchangePassword}
                className="password-input"
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </form>

        <div className="button-signup">
          <p
            className="text-center py-3"
            onClick={isFormValid ? handleSignIn : null}
            style={{
              cursor: isFormValid ? "pointer" : "not-allowed",
              backgroundColor: isFormValid ? "black" : "gray",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Đăng nhập
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

import React, { useState, useEffect } from "react";
import "./SignUpPage.scss";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isFormValid = name && phone && email && password && confirmPassword;
    setIsFormValid(isFormValid);
  }, [name, phone, email, password, confirmPassword]);

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };
  const handleOnChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleOnChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateForm = () => {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Email không hợp lệ.");
      return false;
    }

    // Kiểm tra định dạng số điện thoại (giả sử là 10-11 số)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Số điện thoại không hợp lệ. Phải có 10-11 số.");
      return false;
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
      return false;
    }

    setErrorMessage(""); // Nếu tất cả đều hợp lệ, xóa thông báo lỗi
    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      console.log("Đăng ký thành công với thông tin:", {
        name,
        phone,
        email,
        password,
        confirmPassword,
      });
      alert("Đăng ký thành công!");
      navigate("/signin");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        <p style={{ color: "rgb(191, 191, 191)" }}>Đăng ký</p>
      </div>

      <div className="heading-bar text-center py-5">
        <h1 style={{ fontSize: "25px" }}>ĐĂNG KÝ TÀI KHOẢN</h1>
        <p>
          Bạn đã có tài khoản? Đăng nhập
          <span
            className="link-signin px-2"
            onClick={() => navigate("/signin")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            tại đây
          </span>
        </p>
      </div>

      <div className="formSignup">
        <div className="text-center">
          <h1>THÔNG TIN CÁ NHÂN</h1>
        </div>
        <form>
          <div className="form-Signup-Input">
            <label>
              Họ và tên<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={handleOnChangeName}
            />
          </div>
          <div className="form-Signup-Input">
            <label>
              Số điện thoại<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={handleOnChangePhone}
            />
          </div>
          <div className="form-Signup-Input">
            <label>
              Email<span>*</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleOnChangeEmail}
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
                className="password-input"
                value={password}
                onChange={handleOnChangePassword}
              />
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          <div className="form-Signup-Input">
            <label>
              Nhập lại mật khẩu<span>*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                className="password-input"
                value={confirmPassword}
                onChange={handleOnChangeConfirmPassword}
              />
              <i
                className={`fa-solid ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
          {errorMessage && (
            <span style={{ color: "red", fontSize: "14px" }}>
              {errorMessage}
            </span>
          )}
        </form>
        <div className="button-signup">
          <p
            className="text-center py-3"
            onClick={isFormValid ? handleSignUp : null}
            style={{
              cursor: isFormValid ? "pointer" : "not-allowed",
              backgroundColor: isFormValid ? "black" : "gray",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Đăng ký
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [address, setAddress] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");

  // Các hàm xử lý sự kiện
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedAvatar(file);
    }
  };

  const handlOnchangeName = (event) => {
    setName(event.target.value);
  };

  const handlOnchangeNickName = (event) => {
    setNickname(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlOnchangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handlOnchangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlOnchangeAddress = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      {isLoading && <LoadingComponent />}

      <div className="container-account">
        <div className="container px-4 py-3">
          <div className="signup_header">
            <Link className="link-homepage" to="/">
              Trang chủ
            </Link>
            <p>/</p>
            <p style={{ color: "rgb(191, 191, 191)" }}>Thông tin</p>
          </div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "400",
              marginBottom: "30px",
            }}
          >
            Thông tin cá nhân
          </h1>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="col-lg-6 profile-account">
              <div className="row profile-account">
                <div className="profile-header" style={{ fontSize: 20 }}>
                  Thông tin tài khoản của <strong>{name}</strong>
                  <div className="button-container">
                    <button
                      className="edit-button"
                      onClick={handleEditToggle}
                      disabled={isLoading}
                    >
                      {isEditing ? "Lưu thông tin" : "Sửa thông tin"}
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 27 }} className="d-flex flex-column">
                  <div className="form-avatar mb-4 ">
                    <div className="styles__StyleAvatar-sc-7twymm-0 iRBxWb">
                      <div className="d-flex justify-content-center align-items-center">
                        <div
                          className="avatar-view"
                          style={{ overflow: "hidden" }}
                        >
                          {selectedAvatar ? (
                            <img
                              style={{
                                width: 110,
                                height: 110,
                                borderRadius: "50%",
                              }}
                              src={URL.createObjectURL(selectedAvatar)}
                              alt="Avatar"
                            />
                          ) : avatar ? (
                            <img
                              style={{
                                width: 110,
                                height: 150,
                                borderRadius: "50%",
                              }}
                              src={avatar}
                              alt="Avatar"
                            />
                          ) : (
                            <img
                              style={{
                                width: 60,
                                height: 60,
                              }}
                              src="https://frontend.tikicdn.com/_desktop-next/static/img/account/avatar.png"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {isEditing && (
                      <label
                        htmlFor="avatarInput"
                        className="file-label d-flex justify-content-center align-items-center"
                      >
                        <p>Tải lên ảnh</p>
                        <input
                          id="avatarInput"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden-input"
                        />
                      </label>
                    )}
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Họ và tên</label>
                    <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                      <input
                        className="input"
                        type="text"
                        name="fullName"
                        maxLength="128"
                        placeholder="Thêm họ tên"
                        value={name}
                        onChange={handlOnchangeName}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Username</label>
                    <div>
                      <input
                        className="input"
                        name="userName"
                        maxLength="128"
                        placeholder="Thêm nickname"
                        type="text"
                        value={nickname}
                        onChange={handlOnchangeNickName}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Ngày sinh</label>
                    <div>
                      <input
                        className="input"
                        name="dob"
                        type="date"
                        value={dob}
                        onChange={handleDobChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Giới tính</label>
                    <form>
                      <input
                        className="ss"
                        name="gender"
                        type="radio"
                        value="Nam"
                        checked={gender === "Nam"}
                        onChange={handleGenderChange}
                        disabled={!isEditing}
                      />
                      <span
                        style={{ marginRight: 20 }}
                        className="option-gender"
                      >
                        Nam
                      </span>
                      <input
                        className="ss"
                        name="gender"
                        type="radio"
                        value="Nữ"
                        checked={gender === "Nữ"}
                        onChange={handleGenderChange}
                        disabled={!isEditing}
                      />
                      <span
                        style={{ marginRight: 20 }}
                        className="option-gender"
                      >
                        Nữ
                      </span>
                      <input
                        className="ss"
                        name="gender"
                        type="radio"
                        value="Khác"
                        checked={gender === "Khác"}
                        onChange={handleGenderChange}
                        disabled={!isEditing}
                      />
                      <span
                        style={{ marginRight: 40 }}
                        className="option-gender"
                      >
                        Khác
                      </span>
                    </form>
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Số điện thoại</label>
                    <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                      <input
                        className="input"
                        type="text"
                        name="phone"
                        maxLength="10"
                        placeholder="Cập nhật SDT"
                        value={phone}
                        onChange={handlOnchangePhone}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="form-controls mb-3">
                    <label className="input-label">Email</label>
                    <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                      <input
                        className="input"
                        type="text"
                        name="email"
                        placeholder="Cập nhật Email"
                        value={email}
                        onChange={handlOnchangeEmail}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-controls mb-3">
                  <label className="input-label">Địa chỉ</label>
                  <div className="styles__StyledInput-sc-s5c7xj-5 hisWEc">
                    <input
                      className="input"
                      type="text"
                      name="specificAddress"
                      placeholder="Số nhà, đường, ..."
                      value={address}
                      onChange={handlOnchangeAddress}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              {isEditing && (
                <div className="button-accout text-center">
                  <button onClick={handleEditToggle} className="btn-save">
                    Lưu thông tin
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      // Kiểm tra người dùng tồn tại
      const checkUser = await User.findOne({ email: email });
      if (!checkUser) {
        return reject({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }

      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, checkUser.password);
      if (!isPasswordValid) {
        return reject({
          status: "ERR",
          message: "Mật khẩu không chính xác",
        });
      }

      // Tạo token
      const access_token = jwt.sign({ id: checkUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      const refresh_token = jwt.sign({ id: checkUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      // Trả về thông tin người dùng
      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  loginUser,
};

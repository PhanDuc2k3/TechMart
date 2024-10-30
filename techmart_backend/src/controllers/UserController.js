const UserService = require("../services/UserService");
const loginUser = async (req, res) => {
  try {
    const { id,name, email, password, confirmPassword} =
      req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        message: "The input email",
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secucre: false,
      samesite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
    loginUser,
};
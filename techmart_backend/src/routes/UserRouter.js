// const express = require('express');
// const User = require('../models/UserModel'); // Nhập model người dùng
// const router = express.Router();

// // Route liệt kê tất cả người dùng
// router.get('/list', async (req, res) => {
//     try {
//         const users = await User.find(); // Tìm tất cả người dùng
//         res.status(200).json(users); // Gửi danh sách người dùng về frontend
//     } catch (error) {
//         res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng', error });
//     }
// });

// module.exports = router;

const express = require('express');
const User = require('../models/UserModel'); // Nhập model người dùng
const router = express.Router();

// Route đăng nhập
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser === null) {
            return res.status(400).json({
                status: "ERR",
                message: "Email không tồn tại",
            });
        }
        if (password !== checkUser.password) {
            return res.status(400).json({
                status: "ERR",
                message: "Mật khẩu không chính xác",
            });
        }
        // Trả về token hoặc thông tin người dùng sau khi đăng nhập thành công
        res.status(200).json({
            status: "OK",
            message: "Đăng nhập thành công",
            user: checkUser, // Có thể trả về thông tin người dùng
        });
    } catch (e) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi đăng nhập', error: e });
    }
});

// Route liệt kê tất cả người dùng
router.get('/list', async (req, res) => {
    try {
        const users = await User.find(); // Tìm tất cả người dùng
        res.status(200).json(users); // Gửi danh sách người dùng về frontend
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách người dùng', error });
    }
});

module.exports = router;

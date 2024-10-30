const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Nhập gói cors
const userRoutes = require('./routes/UserRouter'); // Nhập router người dùng

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Kết nối đến MongoDB thành công'))
  .catch(err => console.log('Kết nối MongoDB thất bại:', err));

// Middleware
app.use(cors()); // Thêm middleware CORS
app.use(express.json()); // Xử lý JSON
app.use(cookieParser()); // Xử lý cookie

// Sử dụng router cho người dùng
app.use('/api/users', userRoutes); // Đặt prefix cho các route người dùng

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

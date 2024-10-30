require('dotenv').config(); // Tải các biến môi trường từ .env
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_DB; // Sử dụng biến MONGO_DB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    const connect = await mongoose.connect(uri);
    console.log("Connected database successfully");
  } catch (error) {
    console.log(error)
  }
}
module.exports = connectDB;
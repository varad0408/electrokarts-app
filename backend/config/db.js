const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Using ANSI escape codes for green color in the terminal
    console.log('\x1b[32m%s\x1b[0m', '✅ MongoDB Connected');
    
  } catch (error) {
  console.error(`Database connection failed!`);
  throw error; // This will re-throw the full error
}
};

module.exports = connectDB;
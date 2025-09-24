require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ MONGO_URI not found in .env file!');
    return;
  }

  console.log('Attempting to connect to the database...');
  console.log('URI:', mongoUri); // This will show us the URI it's using

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.error('❌ DATABASE CONNECTION FAILED! Here is the full error:');
    console.error(error); // This will print the detailed error object
  } finally {
    // We close the connection so the script can exit
    await mongoose.connection.close();
  }
};

testConnection();
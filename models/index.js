const mongoose = require('mongoose');

const mongoConfig = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  keepAlive: true,
  useUnifiedTopology: true,
};

async function ConnectDB() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, mongoConfig);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = ConnectDB;

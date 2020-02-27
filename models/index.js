const mongoose = require('mongoose');

const mongoConfig = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  keepAlive: true,
  useUnifiedTopology: true,
};

async function ConnectDB() {
  // db based on env
  const { NODE_ENV, MONGO_URI, MONGO_URI_TESTING } = process.env;

  const DB_URI = NODE_ENV == 'testing' ? MONGO_URI_TESTING : MONGO_URI;

  try {
    const connect = await mongoose.connect(DB_URI, mongoConfig);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = ConnectDB;

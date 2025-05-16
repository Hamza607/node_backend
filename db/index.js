const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      "Connected to MongoDB successfully",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
module.exports = connectDB;

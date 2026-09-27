const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/study-planner";

  try {
    await mongoose.connect(mongoURI);
    console.log(`MongoDB connected: ${mongoURI}`);
  } catch (error) {
    if (!process.env.MONGODB_URI) {
      console.log("No MongoDB URI found. Starting an in-memory MongoDB instance for local development...");
      const memoryServer = await MongoMemoryServer.create();
      await mongoose.connect(memoryServer.getUri("study-planner"));
      console.log("MongoDB connected using in-memory server");
      return;
    }

    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

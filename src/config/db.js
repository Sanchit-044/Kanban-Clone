import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://testuser044:testuser044@kanbackend.hhehmr5.mongodb.net/kanbandb?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;

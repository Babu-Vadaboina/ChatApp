import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    // console.log(`${process.env.MONGODB_URI}/ChatApp`);
    await mongoose.connect(`${process.env.MONGODB_URI}/ChatApp`);
  } catch (error) {
    console.log(error);
  }
};

// Importation des modules
import mongoose from "mongoose";
// Importation des utilitaires
import catchAsyncFn from "../Utils/catch-asyncFn.js";

const connectMongoDB = catchAsyncFn(
  async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 MongoDB connected");
  },
  { exitOnError: true }
);

export default connectMongoDB;

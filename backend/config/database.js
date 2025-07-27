import mongoose from "mongoose"

const connectDB = async () =>{

try {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("mongodb connection successful..")
} catch (error) {
  console.log(error);
}
}

export default connectDB;
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB=async()=>{
    try {
    const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`connectionInstance ${connectionInstance}`);
    
    } catch (error) {
        console.log("MONGODB connection FAILED",error);
        process.exit(1);    
        throw new error;
    }
}

export default connectDB;


import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL); 
            console.log("Database Connected");
        }

    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;
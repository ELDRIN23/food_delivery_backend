import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("./.env");

const dbpassword = process.env.DB_PASSWORD

export const connectDB = async()=>{
    try{
        await mongoose.connect(`mongodb+srv://eldrinjohnson230:${dbpassword}@cluster0.i3k0p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("DB connected sucsessfully")
    }catch(err){
            console.log(err);
            console.log("DB connection failled")
    }
}
import mongoose from "mongoose";
import { MONGO_LOCAL, NODE_ENV } from "../config/env.js";

if(!MONGO_LOCAL){
    throw new Error('Please define the MONGODB connection environment')
}

//connct to db
const connectToDatabase = async()=>{
    try {
        await mongoose.connect(MONGO_LOCAL)
        console.log('Database connected...')
    } catch (error) {
        console.log(error)   

        process.exit(1)
    }
}

export default connectToDatabase
import mongoose from "mongoose";

export const connectDb = async () =>{

    const {connection} = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is connect with ${connection.host}`)

}
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path: './.env'
})

console.log(process.env.MONGO_URI)


const databaseConnection = () => {
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("mongodb connected successfully");
    }).catch((error)=>{
        console.log(error);
    })
}

export default databaseConnection;
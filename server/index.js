import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./utils/db.js";
import feedbackRoute from "./routes/feedbackRoute.js"




// database
databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();


app.get("/",(req,res)=>{
    return res.status(200).json({
        message: "I am from backend side ....",
        success: true
    })
})



// middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true
}
app.use(cors(corsOptions));


// api's
app.use("/api/d1", feedbackRoute);


const PORT = process.env.PORT || 5800;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}....`)
})
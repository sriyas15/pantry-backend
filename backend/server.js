import express from 'express'
import dotenv from 'dotenv'
import pantryRoutes from "./src/routes/pantryRoutes.js";
import { connectDB } from './src/config/db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({path:"backend/.env"})

const app = express()
connectDB();

app.use(cors())

app.use(express.json());
app.use("/api/notes",pantryRoutes);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`Server is Running from ${process.env.PORT}`)
})
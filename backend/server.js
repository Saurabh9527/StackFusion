
import express from 'express';
const app = express();
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './router/userRoute.js'

dotenv.config()
app.use(bodyParser.json());


const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }

app.use(cors(corsOption));  
app.use('/user', userRoute)


const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`Server is starting at ${port}`); 
})
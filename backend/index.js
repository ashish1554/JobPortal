import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import applicationRoute from './routes/applicationroute.js';
import companyRoute from './routes/companyroute.js';
import jobRoute from './routes/jobroute.js';
import userRoute from './routes/userroute.js';
import connectDB from './utils/db.js';


dotenv.config({})
const app= express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


const corsOptions={
    // origin: 'http://localhost:5173',
       origin: 'https://jp-frontend-cx49.onrender.com/',
    credentials: true,
}
app.use(cors(corsOptions));


//api

app.use('/api/users',userRoute)
app.use('/api/company',companyRoute)
app.use('/api/job',jobRoute)
app.use('/api/application',applicationRoute)
// app.get('/api',(req,res)=>{
//     res.json({message:'API is running'})
// })

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    connectDB()
    console.log(`server is running at ${port}`)
})

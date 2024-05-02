import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import pickupRouter from './routes/pickup.routes.js'
import specialpickupRouter from './routes/special.routes.js'
import employeeRouter from './routes/employee.routes.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Notification-related routes
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to MongoDB!')
}).catch((err)=>{
    console.log(err)
});

const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('server is runing on port 3000')
});

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/pickup", pickupRouter);
app.use('/api/specialpickup', specialpickupRouter);
app.use('/api/employee', employeeRouter);


app.use((err,req,res,next)=>{

    const statusCode=err.statusCode|| 500;
    const message=err.message||'internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
});
    







import  express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import reviewRoute from './Routes/review.js'
import bookingRoute from './Routes/booking.js'

dotenv.config();

const app =express()
const port = process.env.PORT || 8080

// const Razorpay = require("razorpay")

const corsOptions = {
    origin:true
}
app.get('/',(req,res)=>{
    res.send('Api is working')
})
// database connections
mongoose.set('strictQuery',false)

const connectDB = async()=>{
    try{
        // await mongoose.connect(process.env.MONGO_URL, {
        //     useNewUrlParser:true,
        //     UseUnifiedTopology: true,
        // })
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB database is connected')
    }
    catch(err){
        console.log("Mongodb  is not connected")

    }
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);
app.use('/api/v1/booking',bookingRoute);


// app.post('/orders',async(req,res)=>{
//     const razorpay = new Razorpay({
//         key_id:"",
//         key_secret: ""
//     })
//     const options={
//         amount: req.body.amount,
//         currency: req.body.currency,
//         receipt :"receipt#1",
//         payment_capture:1
//     }
//     try{
//         const response = await razorpay.orders.create(options)
//         res.json({
//             order_id: response.id,
//             currency:response.currency,
//             amount:response.amount
//         })
//     }
//     catch(error){
//         res.status(500).send("internal server error")
//     }
// })



app.listen(port,()=>{
    connectDB();
    console.log('Server is running on port '+ port );
})


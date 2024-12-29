import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import componentRouter from "./routes/componentRoutes.js"
import userRouter from "./routes/userRoute.js"
import dotenv from 'dotenv'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import adminRouter from "./routes/adminRoute.js"
import forgetpass from "./routes/forgetpass.js"
//import 'dotenv/config'

//app config
const app = express()
const port = process.env.PORT || 4000;
dotenv.config();

//middleware
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://technest-f6dt.onrender.com",
      "https://technest-electronic.onrender.com",
      "https://technest-admin.onrender.com"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization","token"],
}));

//db connection
connectDB();

//Api endpoints
app.use("/api/component",componentRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/admin",adminRouter)
app.use("/api/forget",forgetpass)


app.get("/", (req, res) => {
  res.send('Server Started...')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

//mongodb+srv://sundaramsingh237:<db_password>@cluster0.zafxk.mongodb.net/?

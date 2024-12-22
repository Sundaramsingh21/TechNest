import express from "express"
import { resetpass, sendotp, verifyotp } from "../controllers/ForgetPass.js";


const forgetpass = express.Router();
forgetpass.post('/otpsend',sendotp)
forgetpass.post('/resetpassword',resetpass)
forgetpass.post('/verifyotp',verifyotp)

export default forgetpass;
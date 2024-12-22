import express from "express";
import { placeOrder, userOrder , listorders, updateStatus, removecomponent } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/userorders",authMiddleware,userOrder);
orderRouter.get('/list',listorders)
orderRouter.post('/status',updateStatus)
orderRouter.post('/delete',removecomponent)


export default orderRouter;
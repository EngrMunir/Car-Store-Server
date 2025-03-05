import { Router } from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { orderController } from "./order.controller";

const orderRouter = Router();
orderRouter.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);

orderRouter
.route("/")
.post(auth(USER_ROLE.user), orderController.createOrder)
.get(auth(USER_ROLE.user), orderController.getOrders);

export default orderRouter;

// import express from 'express'
// import { OrderControllers } from './order.controller';

// const router = express.Router()

// router.post('/', OrderControllers.createOrder)
// router.get('/', OrderControllers.getRevenue)

// export const OrderRoutes = router;
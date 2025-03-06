import express from "express";
import auth from "../../app/middleware/auth";
import { USER_ROLE } from "../User/user.constant";
import { orderController } from "./order.controller";

const router = express.Router();

router.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);
router.post("/", auth(USER_ROLE.user), orderController.createOrder);
router.get("/", auth(USER_ROLE.user), orderController.getOrders);

export const OrderRoutes = router;

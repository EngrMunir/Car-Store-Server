import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async(req:Request, res:Response)=>{
    try {
        const { email, car, quantity, totalPrice }=req.body;

        const order = OrderServices.createOrderAndUpdateInventory(email, car, quantity, totalPrice);

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order,
        })

    } catch (err) {
        console.log(err)
    }
}

const getRevenue = async(req:Request, res:Response)=>{
    try {
        const totalRevenue = await OrderServices.calculateTotalRevenue()

        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: { totalRevenue },
        });
    } catch (err) {
        console.log(err)
    }
}

export const OrderControllers = {
    createOrder,
    getRevenue,
};
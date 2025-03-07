
import httpStatus from 'http-status';
import { catchAsync } from '../../app/utils/catchAsync';
import { orderService } from './order.service';
import sendResponse from '../../app/utils/sendResponse';

const createOrder = catchAsync(async (req, res) =>{

    const user = req.user;
    console.log('user in create order',user);
    const order = await orderService.createOrder(user, req.body, req.ip!);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success:true,
        message:"Order placed successfully",
        data: order,
    });
});

const getOrders = catchAsync(async (req, res) =>{
    const order = await orderService.getOrders();

    sendResponse(res, {
        statusCode:httpStatus.CREATED,
        message:"Order retrieved successfully",
        success:true,
        data:order,
    });
});

const verifyPayment = catchAsync(async (req, res) =>{
    const order = await orderService.verifyPayment(req.query.order_id as string);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message:'Order verified successfully',
        success:true,
        data:order,
    });
});

export const orderController = { createOrder, verifyPayment, getOrders };

// import { Request, Response } from "express";
// import { OrderServices } from "./order.service";

// const createOrder = async(req:Request, res:Response)=>{
//     try {
//         const { email, car, quantity, totalPrice }=req.body;

//         const order = OrderServices.createOrderAndUpdateInventory(email, car, quantity, totalPrice);

//         res.status(201).json({
//             success: true,
//             message: 'Order created successfully',
//             data: order,
//         })

//     } catch (err) {
//         console.log(err)
//     }
// }

// const getRevenue = async(req:Request, res:Response)=>{
//     try {
//         const totalRevenue = await OrderServices.calculateTotalRevenue()

//         res.status(200).json({
//             success: true,
//             message: 'Revenue calculated successfully',
//             data: { totalRevenue },
//         });
//     } catch (err) {
//         console.log(err)
//     }
// }

// export const OrderControllers = {
//     createOrder,
//     getRevenue,
// };
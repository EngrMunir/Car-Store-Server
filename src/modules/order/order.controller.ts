
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

const getOrderByEmail = catchAsync(async (req, res) => {
    const { email } = req.query; // Extract email from query params

    if (!email) {
        return sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: "Email is required to fetch orders",
            data: null,
        });
    }

    const orders = await orderService.getOrderByEmail(email as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Orders retrieved successfully",
        success: true,
        data: orders,
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

export const orderController = { createOrder, verifyPayment, getOrders, getOrderByEmail };
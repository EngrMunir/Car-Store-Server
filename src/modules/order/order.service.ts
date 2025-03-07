import AppError from "../../app/errors/AppError";
import { CarModel } from "../car/car.model";
import { TUser } from "../User/user.interface";
import httpStatus from "http-status";
import Order from "./order.model";
import { orderUtils } from "./order.utils";

const createOrder = async(
    user:TUser,
    payload: { cars: { product: string; quantity:number}[]},
    client_ip:string
) =>{
    if(!payload?.cars?.length)
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
    
    const cars = payload.cars;
    
    let totalPrice = 0;
    const carDetails = await Promise.all(
        cars.map(async (item) =>{
            const car = await CarModel.findById(item.car);
            if(car){
                const subtotal = car? (car.price || 0)*item.quantity:0;
                totalPrice += subtotal;
                return item;
            } 
        })
    );

    let order = await Order.create({
        user,
        cars:carDetails,
        totalPrice,
    });

    // payment integration
    const shurjoPayPayload ={
        amount:totalPrice,
        order_id:order._id,
        currency:'BDT',
        customer_name: user.name,
        customer_address:"N/A",
        customer_email:user.email,
        customer_phone:"N/A",
        customer_city:"N/A",
        client_ip,
        return_url: process.env.SP_RETURN_URL, 
    };

    const payment = await orderUtils.makePaymentAsync(shurjoPayPayload);

    if(payment?.transactionStatus){
        order = await order.updateOne({
            transaction:{
                id:payment.sp_order_id,
                transactionStatus:payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
};

const getOrders = async () =>{
    const data = await Order.find();
    return data;
};

const verifyPayment = async (order_id: string)=>{
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if(verifiedPayment.length){
        await Order.findOneAndUpdate(
            {
                "transaction.id":order_id,
            },
            {
                "transaction.bank_status":verifiedPayment[0].bank_status,
                "transaction.sp_code":verifiedPayment[0].sp_code,
                "transaction.transactionStatus":verifiedPayment[0].transaction_status,
                "transaction.method":verifiedPayment[0].method,
                "transaction.date_time":verifiedPayment[0].date_time,
                status:
                verifiedPayment[0].bank_status == 'Success'
                ? "Paid"
                :verifiedPayment[0].bank_status == "Failed"
                ? "Pending"
                :verifiedPayment[0].bank_status == 'Cancel'
                ? "Cancelled"
                :"",
            }
        );
    }
    return verifiedPayment;
};

export const orderService ={
    createOrder,
    getOrders,
    verifyPayment,
}

// import { CarModel } from "../car/car.model"
// import { OrderModel } from "./order.model";


// const createOrderAndUpdateInventory = async (email: string, carId: string, quantity: number, totalPrice: number)=>{
//     const car = await CarModel.findById(carId);

//     if (!car) {
//         throw new Error("Car not found");
//       }
    
//       // Check if there is enough quantity in stock
//       if (car.quantity < quantity) {
//         throw new Error("Insufficient stock");
//       }

//     car.quantity -= quantity;
//     if (car.quantity === 0) {
//         car.inStock = false;
//     }

//     await car.save();

//     const newOrder = new OrderModel({ email, car: carId, quantity, totalPrice });
//     await newOrder.save();

//     return newOrder;
// }

// const calculateTotalRevenue = async()=>{
//     const result = await OrderModel.aggregate([
//         {
//             $lookup: {
//                 from:'cars',
//                 localField:'car',
//                 foreignField:'_id',
//                 as:'carDetails',
//             }
//         },
//         {
//             $unwind: '$carDetails'
//         },
//         {
//             $project: {
//                 totalRevenue: { $multiply: ['$quantity','$carDetails.price']},
//             }
//         },
//         {
//             $group:{
//                 _id:null,
//                 totalRevenue:{ $sum: '$totalRevenue'}
//             }
//         }
//     ])
//     return result[0]?.totalRevenue || 0;
// }

// export const OrderServices = {
//     createOrderAndUpdateInventory,
//     calculateTotalRevenue,
// }
import { CarModel } from "../car.model"
import { OrderModel } from "../order.model";


const createOrderAndUpdateInventory = async (email: string, carId: string, quantity: number, totalPrice: number)=>{
    const car = await CarModel.findById(carId);

    if (!car) {
        throw new Error("Car not found");
      }
    
      // Check if there is enough quantity in stock
      if (car.quantity < quantity) {
        throw new Error("Insufficient stock");
      }

    car.quantity -= quantity;
    if (car.quantity === 0) {
        car.inStock = false;
    }

    await car.save();

    const newOrder = new OrderModel({ email, car: carId, quantity, totalPrice });
    await newOrder.save();

    return newOrder;
}

const calculateTotalRevenue = async()=>{
    const result = await OrderModel.aggregate([
        {
            $lookup: {
                from:'cars',
                localField:'car',
                foreignField:'_id',
                as:'carDetails',
            }
        },
        {
            $unwind: '$carDetails'
        },
        {
            $project: {
                totalRevenue: { $multiply: ['$quantity','$carDetails.price']},
            }
        },
        {
            $group:{
                _id:null,
                totalRevenue:{ $sum: '$totalRevenue'}
            }
        }
    ])
    return result[0]?.totalRevenue || 0;
}

export const OrderServices = {
    createOrderAndUpdateInventory,
    calculateTotalRevenue,
}
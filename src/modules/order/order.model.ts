import { model, Schema } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>({
    email: { type: String, required: true},
    car: { type: Schema.Types.ObjectId, ref:'Car', required:true },
    quantity: { type: Number, required: true},
    totalPrice: { type: Number, required:true } 
},
{ timestamps: true } 
)

export const OrderModel= model<Order>('Order',orderSchema);
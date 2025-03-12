import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
// import { Order } from "./order.interface";


// const orderSchema = new Schema<Order>({
//     email: { type: String, required: true},
//     car: { type: Schema.Types.ObjectId, ref:'Car', required:true },
//     quantity: { type: Number, required: true},
//     totalPrice: { type: Number, required:true } 
// },
// { timestamps: true } 
// )

// export const OrderModel= model<Order>('Order',orderSchema);

const OrderSchema = new Schema<IOrder>(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        products:[
            {
                product:{
                    type:Schema.Types.ObjectId,
                    ref:"Car",
                    required:true,
                },
                quantity:{
                    type:Number,
                    required:true,
                },
            },
        ],
        totalPrice:{
            type:Number,
            required:true,
        },
        status:{
            type: String,
            enum:["Pending","Paid", "Shipped","Completed","Cancelled"],
            default:"Pending",
        },
        transaction:{
            id:String,
            transactionStatus:String,
            bank_status:String,
            sp_code:String,
            sp_message:String,
            method:String,
            date_time:String,
        },
    },
    {
        timestamps:true,
    }
);

const Order = model<IOrder>("Order", OrderSchema);

export default Order;
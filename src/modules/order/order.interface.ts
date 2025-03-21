import { Types, Document } from "mongoose";

export interface IOrder extends Document {
  userEmail:string;
  products:{
    product:Types.ObjectId;
    quantity:number;
  }[];
  totalPrice:number;
  status:"Pending" | "Paid" | "Shipped" |"Completed" |"Cancelled";
  transaction:{
    id:string;
    transactionStatus:string;
    bank_status:string;
    sp_code:string;
    sp_message:string;
    method:string;
    date_time:string;
  };
  createdAt?:Date;
  updatedAt?:Date;
}

// export type Order = {
//     email: string;
//     car: Types.ObjectId;
//     quantity: number;
//     totalPrice: number; 
//   }
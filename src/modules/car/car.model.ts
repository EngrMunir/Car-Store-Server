import { model, Schema } from 'mongoose';
import { Car } from './car.interface';

const carSchema = new Schema<Car>({
    brand: { type: String, required:true},
    model: { type: String, required:true },
    year: { type: Number, required:true, min:1994 },
    price: { type: Number, required:true, min:0 },
    category:{
        type: String,
        enum:["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
        required: true
    },
    description:{ type: String, required: true },
    image:{type: String, required:true},
    quantity:{ type: Number, required:true, min:0 },
    inStock: { type: Boolean, required:true, default: true }
},
{ timestamps: true } 
)

export const CarModel= model<Car>('Car',carSchema);
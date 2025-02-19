import { CarModel } from "./car.model";
import { Car } from "./car.interface";

const createCarIntoDB = async(car: Car)=>{
   const result = await CarModel.create(car)
   return result;
}

// get all car
const getAllCarFromDB = async()=>{
    const result = await CarModel.find();
    return result;
}

// get single car
const getSingleCarFromDB = async(id: string)=>{
    const result = await CarModel.findById(id);
    return result;
}

// update single car
const getSingleCarAndUpdateFromDB = async(id: string, updatedData:Partial<Car>)=>{
    const result = await CarModel.findByIdAndUpdate(id, updatedData,{new:true, runValidators:true});
    return result;
}

// delete single car
const getSingleCarAndDeleteFromDB = async(id: string)=>{
    const result = await CarModel.findByIdAndDelete(id);
    return result;
}

export const CarServices = {
    createCarIntoDB,
    getAllCarFromDB,
    getSingleCarFromDB,
    getSingleCarAndUpdateFromDB,
    getSingleCarAndDeleteFromDB,
}
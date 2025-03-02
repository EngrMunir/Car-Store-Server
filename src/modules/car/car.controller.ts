import { Request, Response } from "express";
import { CarServices } from "./car.service";

const createCar = async(req:Request, res:Response)=>{

    try {
        const carData  = req.body;

    // will call service function to send this data
    const result = await CarServices.createCarIntoDB(carData);

    // send response
    res.status(200).json({
        success:true,
        message:'Car is created successfully',
        data:result
    })
    } catch (err) {
        console.log(err);
    }
}

const getAllCar = async(req:Request,res:Response)=>{
    try {
        
        const result = await CarServices.getAllCarFromDB()

        res.status(200).json({
            success:true,
            message:'Cars retrieved successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}

// get single car
const getSingleCar = async(req:Request,res:Response)=>{
    try {
        const { carId } = req.params;
        const result = await CarServices.getSingleCarFromDB(carId)

        res.status(200).json({
            success:true,
            message:'Car retrieved successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}
// get delete single car
const updateSingleCar = async(req:Request,res:Response)=>{
    try {
        const { carId } = req.params;
        const updateData = req.body;

        const result = await CarServices.getSingleCarAndUpdateFromDB(carId, updateData)

        res.status(200).json({
            success:true,
            message:'Car updated successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}

// get delete single car
const deleteSingleCar = async(req:Request,res:Response)=>{
    try {
        const { carId } = req.params;
        const result = await CarServices.getSingleCarAndDeleteFromDB(carId)

        res.status(200).json({
            success:true,
            message:'Car deleted successfully',
            data:result
        })
    } catch (err) {
        console.log(err)
    }
}
export const CarControllers ={
    createCar,
    getAllCar,
    getSingleCar,
    updateSingleCar,
    deleteSingleCar,
}
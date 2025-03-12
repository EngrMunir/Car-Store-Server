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

const getAllCar = async (req: Request, res: Response) => {
    try {
      const { search, brand, category, model, priceMin, priceMax, availability, sortBy, sortOrder, limit, page } = req.query;
  
      // Build the query object
      const query: any = {};
  
      if (search) {
        query.$or = [
          { brand: { $regex: search, $options: "i" } },
          { model: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ];
      }
  
      if (brand) query.brand = brand;
      if (category) query.category = category;
      if (model) query.model = model;
      if (priceMin) query.price = { ...query.price, $gte: parseFloat(priceMin as string) };
      if (priceMax) query.price = { ...query.price, $lte: parseFloat(priceMax as string) };
      if (availability) query.inStock = availability === "true";
  
      // Pagination
      const pageNumber = parseInt(page as string) || 1;
      const pageSize = parseInt(limit as string) || 10;
      const skip = (pageNumber - 1) * pageSize;
  
      // Sorting
      const sortOptions: any = {};
      if (sortBy) sortOptions[sortBy as string] = sortOrder === "desc" ? -1 : 1;
  
      // Fetch data
      const cars = await CarServices.getFilteredCarsFromDB(query, pageSize, skip, sortOptions);
      const totalCars = await CarServices.getTotalCarsCount(query);
  
      res.status(200).json({
        success: true,
        message: "Cars retrieved successfully",
        data: cars,
        total: totalCars,
        page: pageNumber,
        limit: pageSize,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

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
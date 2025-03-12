import { CarModel } from "./car.model";
import { Car } from "./car.interface";
import QueryBuilder from "../../app/builder/QueryBulder";

const createCarIntoDB = async(car: Car)=>{
   const result = await CarModel.create(car)
   return result;
}

// get all car
// Get all cars with filtering, searching, sorting, and pagination
const getAllCarFromDB = async (query: Record<string, unknown>) => {
    const modelQuery = CarModel.find(); // Start with a basic query
  
    const queryBuilder = new QueryBuilder<Car>(modelQuery, query)
      .search(["brand","name", "category"]) // Search in name, brand, and model
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const cars = await queryBuilder.modelQuery;
    const totalInfo = await queryBuilder.countTotal();
  
    return { cars, ...totalInfo };
  };
  const getFilteredCarsFromDB = async (query: any, pageSize: number, skip: number, sortOptions: any) => {
    const cars = await CarModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

    return cars;
};

const getTotalCarsCount = async (query: any) => {
    return await CarModel.countDocuments(query);
};

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
    getFilteredCarsFromDB,
    getTotalCarsCount,
    getSingleCarAndUpdateFromDB,
    getSingleCarAndDeleteFromDB,
}
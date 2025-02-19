import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) =>{
    const result = await UserServices.createUserIntoDB(req.body);

    const filteredData = {
        _id:result._id,
        name:result.name,
        email:result.email,
    };

    sendResponse(res, {
        statusCode:httpStatus.CREATED,
        success:true,
        message:'User Registered Successfully',
        data:filteredData,
    })
});

export const UserControllers ={
    createUser,
}
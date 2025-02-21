import AppError from "../../app/errors/AppError";
import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { User } from "./user.model";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) =>{

    const isUserExist = await User.isUserExistsByEmail(req.body.email);
    if(isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,'This user is already exists');
    }

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
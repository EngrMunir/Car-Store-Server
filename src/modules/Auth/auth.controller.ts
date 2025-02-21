import { catchAsync } from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { AuthServices } from "./auth.service";
import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res )=>{
    const result = await AuthServices.loginUser(req.body);
    console.log('req.body',req.body)
    const { accessToken } = result;

    sendResponse(res, {
        statusCode:httpStatus.OK,
        success:true,
        message:'Logged in successful!',
        data:{
            accessToken
        }
    })
});

export const AuthControllers ={
    loginUser,
}
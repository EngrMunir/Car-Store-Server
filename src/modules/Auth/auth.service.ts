import AppError from "../../app/errors/AppError";
import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import httpStatus from 'http-status';
import { createToken } from "./auth.utils";
import config from "../../app/config";

const loginUser = async (payload:TLoginUser)=>{
    // checking if the user exists
    const user = await User.isUserExistsByEmail(payload.email);

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }
    // checking if the password is correct
    if(!await User.isPasswordMatched(payload?.password, user?.password)){
        throw new AppError(httpStatus.FORBIDDEN,'Password do not matched');
    }

    // create token and sent to the client
    const jwtPayload ={
        email:payload.email,
        role:(await user).role
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
    );
    return {
        accessToken
    }

}

export const AuthServices ={
    loginUser
}
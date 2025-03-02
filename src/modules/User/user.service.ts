import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload: Partial<TUser>)=>{
    payload.role='user';
    const newUser = await User.create(payload);

    return newUser;
}

const getAllUserFromDB = async()=>{
    const users = await User.find();
    return users;
}

export const UserServices ={
    createUserIntoDB,
    getAllUserFromDB
}
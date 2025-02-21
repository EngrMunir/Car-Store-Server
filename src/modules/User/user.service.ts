import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload: Partial<TUser>)=>{
    payload.role='user';
    const newUser = User.create(payload);

    return newUser;
}

export const UserServices ={
    createUserIntoDB,
}
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async(payload: Partial<TUser>)=>{
    const newUser = await User.create({...payload, role:"user"});

    return newUser;
};

const getAllUserFromDB = async()=>{
    const users = await User.find().select("_id name email role");
    return users;
};

const changeRoleIntoDB = async(userId: string, newRole:string)=>{
    const result = await User.findByIdAndUpdate(
        userId, 
        {role:newRole}, 
        {
            new:true,
            runValidators: true
        });
    return result;
};

const deleteUserFromDB =async(id:string)=>{
 const deleteUser = await User.findByIdAndDelete(id);
 if(!deleteUser){
    return { deletedCount:0}
 }else{
    return { deletedCount:1}
 }
}

export const UserServices ={
    createUserIntoDB,
    getAllUserFromDB,
    changeRoleIntoDB,
    deleteUserFromDB,
}
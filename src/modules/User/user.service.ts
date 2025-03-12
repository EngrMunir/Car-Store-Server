import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcrypt";
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

const changePasswordIntoDB = async(email:string, oldPassword:string, newPassword:string)=>{
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if(!isMatch){
        throw new Error('Old password not matched')
    }
     // Hash new password
     const salt = await bcrypt.genSalt(12);
     user.password = await bcrypt.hash(newPassword, salt);
 
     await user.save();
 
     return { message: "Password updated successfully" };
}

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
    changePasswordIntoDB
}
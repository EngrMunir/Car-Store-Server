import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../app/config';
import { model, Schema } from 'mongoose';


const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      select:0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
   // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function(email:string){
  return await User.findOne({email}).select('+password');
};

userSchema.statics.isPasswordMatched = async function(
  plainTextPassword, hashedPassword){
    return await bcrypt.compare(plainTextPassword,hashedPassword);
  }

export const User = model<TUser, UserModel>('User', userSchema);

import { model, Schema } from 'mongoose';
import { TCart } from './Cart.interface';

const cartSchema = new Schema<TCart>(
  {
    userEmail: { type: String, required: true },
    items: [
      {
        carId: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true ,_id:false}
);

export const CartModel = model<TCart>('Cart', cartSchema);
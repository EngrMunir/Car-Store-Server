import { CartModel } from "./Cart.model";

const addToCart = async (userEmail: string, carId: string) => {
  let cart = await CartModel.findOne({ userEmail });
  if (!cart) {
    cart = new CartModel({ userEmail, items: [] });
  }
  const itemIndex = cart.items.findIndex((item) => item.carId.toString() === carId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1; 
  } else {
    cart.items.push({ carId, quantity: 1 }); 
  }

  await cart.save();
  return cart;
};

// Get user's cart
const getUserCart = async (payload: string) => {
  
  return await CartModel.findOne({userEmail: payload });
};

// Update cart item quantity (Increase/Decrease)
const increaseQuantity = async (userEmail: string, carId: string ) => {
  const cart = await CartModel.findOne({ userEmail });

  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex((item) => item.carId.toString() === carId);

  if (itemIndex === -1) throw new Error('Item not found in cart');

  // Update quantity (increase or decrease)
  cart.items[itemIndex].quantity += 1;

  await cart.save();
  return cart;
};
const decreaseQuantity = async (userEmail: string, carId: string ) => {
  const cart = await CartModel.findOne({ userEmail });

  if (!cart) throw new Error('Cart not found');

  const itemIndex = cart.items.findIndex((item) => item.carId.toString() === carId);

  if (itemIndex === -1) throw new Error('Item not found in cart');

  // Update quantity (increase or decrease)
  cart.items[itemIndex].quantity -= 1;

  await cart.save();
  return cart;
};

// Remove item from cart
const removeCartItem = async (userEmail: string, carId: string) => {
  const cart = await CartModel.findOne({ userEmail });

  if (!cart) throw new Error('Cart not found');

  cart.items = cart.items.filter((item) => item.carId.toString() !== carId);
  await cart.save();
  return cart;
};


export const CartServices = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
  getUserCart,
};

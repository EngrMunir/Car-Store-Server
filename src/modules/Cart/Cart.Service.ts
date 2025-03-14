import { CarModel } from "../car/car.model";
import { CartModel } from "./Cart.model";
import { ObjectId } from "mongoose";

const addToCart = async (email: string, productId: ObjectId) => {
  const car = await CarModel.findById(productId);
  if (!car) throw new Error("Car not found");

  // Ensure that there is enough stock
  if (car.quantity <= 0) throw new Error("Car is out of stock");
  // console.log(productId);
  let cart = await CartModel.findOne({ email });

  if (!cart) {
    cart = new CartModel({ email, items: [] });
  }

  // Find if the product already exists in the cart
  const isExistItem = cart.items.find((item) => item.product.equals(productId));
  // console.log(isExistItem);

  if (isExistItem) {
    // If product already exists, increase its quantity
    const itemIndex = cart.items.findIndex((item) => item.product.equals(productId));
    cart.items[itemIndex].quantity += 1;
    car.quantity-=1;
  } else {
    // If product does not exist, add a new entry
    cart.items.push({ product: productId, quantity: 1 });
    car.quantity-=1;
  }

  await car.save();
  await cart.save();
  return cart;
};



const getUserCart = async (email: string) => {
  const res = await CartModel.findOne({ email }).populate("items.product");
  
  return res;
};

const increaseQuantity = async (email: string, productId: string) => {
  const car = await CarModel.findById(productId);
  if (!car) throw new Error("Car not found");

  // Ensure that there is enough stock
  if (car.quantity <= 0) throw new Error("Car is out of stock");
  // console.log(productId);
  const cart = await CartModel.findOne({ email });
  console.log('find cart',cart)
  console.log('service page', email, productId)

  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) throw new Error("Item not found in cart");

  cart.items[itemIndex].quantity += 1;
  car.quantity-=1;
  await car.save();
  await cart.save();
  console.log('cart',cart);
  return cart;
};

const decreaseQuantity = async (email: string, productId: string) => {
  const car = await CarModel.findById(productId);
  if (!car) throw new Error("Car not found");

  const cart = await CartModel.findOne({ email });

  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) throw new Error("Item not found in cart");

  if (cart.items[itemIndex].quantity > 1) {
    cart.items[itemIndex].quantity -= 1;
    car.quantity+=1;
  } else {
    cart.items.splice(itemIndex, 1);
  }

  if (cart.items.length === 0) {
    await CartModel.findOneAndDelete({ email });
    return null;
  }

  await car.save();
  await cart.save();
  return cart;
};

const removeCartItem = async (email: string, productId: string) => {
  const cart = await CartModel.findOne({ email });

  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (cart.items.length === 0) {
    await CartModel.findOneAndDelete({ email });
    return null;
  }

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

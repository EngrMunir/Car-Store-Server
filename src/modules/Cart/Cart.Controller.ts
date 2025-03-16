import { Request, Response } from 'express';
import { CartServices } from './Cart.Service';
import { catchAsync } from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const addToCart = async (req: Request, res: Response) => {
//  console.log(req.body);
  try {
    const { productId, email } = req.body;
    
    // console.log(email, productId)
    const result = await CartServices.addToCart( email, productId);
    res.status(200).json({ success: true, message: 'Added to cart', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req: Request, res: Response) => {
  
  const {email} =req.params;
  const cart = await CartServices.getUserCart(email);
  sendResponse(res, {
          statusCode: httpStatus.OK,
          success:true,
          message:"Cart Retrieved successfully",
          data: cart,
      });

};

const increaseQuantity = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    
    if (!email || !productId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const updatedCart = await CartServices.increaseQuantity(email, productId);
    res.status(200).json({ success: true, message: 'Cart updated', data: updatedCart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const decreaseQuantity = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    if (!email || !productId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const updatedCart = await CartServices.decreaseQuantity(email, productId);
    res.status(200).json({ success: true, message: 'Cart updated', data: updatedCart });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.params;
    const result = await CartServices.removeCartItem(email, productId);
    res.status(200).json({ success: true, message: 'Item removed', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const clearCart = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  await CartServices.clearCart(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cart cleared successfully",
    data: null,
  });
});

export const CartControllers = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getUserCart,
  removeCartItem,
  clearCart,
};

import { Request, Response } from 'express';
import { CartServices } from './Cart.Service';

const addToCart = async (req: Request, res: Response) => {
  try {
    const { email, productId } = req.body;
    const result = await CartServices.addToCart(email, productId);
    res.status(200).json({ success: true, message: 'Added to cart', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req: Request, res: Response) => {
  try {
    
    const { email }  =  req.params;  
    // console.log("Extracted Email:", email);
    
    const result = await CartServices.getUserCart(email);
    res.status(200).json({ success: true, message: 'Cart retrieved', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
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
    const { email, productId } = req.body;
    const result = await CartServices.removeCartItem(email, productId);
    res.status(200).json({ success: true, message: 'Item removed', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const CartControllers = {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  getUserCart,
  removeCartItem,
};

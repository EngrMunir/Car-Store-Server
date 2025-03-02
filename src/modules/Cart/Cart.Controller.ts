import { Request, Response } from 'express';
import { CartServices } from './Cart.Service';

const addToCart = async (req: Request, res: Response) => {
  try {
    const { userEmail, carId } = req.body;
    const result = await CartServices.addToCart(userEmail, carId );
    res.status(200).json({ success: true, message: 'Added to cart', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req: Request, res: Response) => {
  try {
    const { userEmail } = req.params;
    const result = await CartServices.getUserCart(userEmail);

    res.status(200).json({ success: true, message: 'Cart retrieved', data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const increaseQuantity = async (req: Request, res: Response) => {
    try {
      const { userEmail, carId } = req.body;
  
      if (!userEmail || !carId ) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const updatedCart = await CartServices.increaseQuantity(userEmail, carId );
      res.status(200).json({ success: true, message: 'Cart updated', data: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };  
const decreaseQuantity = async (req: Request, res: Response) => {
    try {
      const { userEmail, carId } = req.body;
  
      if (!userEmail || !carId ) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      const updatedCart = await CartServices.decreaseQuantity(userEmail, carId );
      res.status(200).json({ success: true, message: 'Cart updated', data: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };  

const removeCartItem = async (req: Request, res: Response) => {
  try {
    const { userEmail, carId } = req.body;
    const result = await CartServices.removeCartItem(userEmail, carId);
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
  // updateCartItem,
  removeCartItem,
  // clearCart,
};
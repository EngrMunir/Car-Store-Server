import express from 'express';
import { CartControllers } from './Cart.Controller';

const router = express.Router();

router.post('/add', CartControllers.addToCart);
router.put('/increaseQuantity', CartControllers.increaseQuantity);
router.put('/decreaseQuantity', CartControllers.decreaseQuantity);
router.delete('/remove', CartControllers.removeCartItem);
router.get('/cartItem/:userEmail', CartControllers.getUserCart);

// // router.put('/update', CartControllers.updateCartItem);
// router.delete('/clear/:userId', CartControllers.clearCart);

export const CartRoutes = router;
import express from 'express';
import { CartControllers } from './Cart.Controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.get('/by-email/:email',auth(USER_ROLE.user), CartControllers.getUserCart);
router.post('/add', CartControllers.addToCart);
router.patch('/increase-quantity/:email/:productId', CartControllers.increaseQuantity);
router.patch('/decrease-quantity/:email/:productId', CartControllers.decreaseQuantity);
router.delete('/remove', CartControllers.removeCartItem);
// router.get('/cartItem', CartControllers.getUserCart);


// // router.put('/update', CartControllers.updateCartItem);
// router.delete('/clear/:userId', CartControllers.clearCart);

export const CartRoutes = router;
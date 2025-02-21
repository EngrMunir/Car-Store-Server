import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { AuthValidation } from '../Auth/authValidation';
import { AuthControllers } from '../Auth/auth.controller';

const router = express.Router();

router.post(
    '/register',
    validateRequest(createUserValidationSchema),
    UserControllers.createUser,
);

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

export const UserRoutes = router;
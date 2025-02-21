import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../app/middleware/validateRequest';
import { AuthValidation } from './authValidation';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
)

export const AuthRoutes = router;
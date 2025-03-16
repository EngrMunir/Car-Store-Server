import express from 'express'
import { CarControllers } from './car.controller'
import auth from '../../app/middleware/auth'
import { USER_ROLE } from '../User/user.constant'
import validateRequest from '../../app/middleware/validateRequest'
import { CarValidation } from './car.validation'

const router = express.Router()


// will call controller func
router.post('/', 
    auth(USER_ROLE.admin),
    validateRequest(CarValidation.createCarValidationSchema),
    CarControllers.createCar)

router.get('/',CarControllers.getAllCar)

router.get('/:carId',auth(USER_ROLE.user), CarControllers.getSingleCar)

router.put('/:carId', CarControllers.updateSingleCar)

router.delete('/:carId', CarControllers.deleteSingleCar)

export const CarRoutes = router;
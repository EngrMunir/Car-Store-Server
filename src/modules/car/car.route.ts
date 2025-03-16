import express from 'express'
import { CarControllers } from './car.controller'
import auth from '../../app/middleware/auth'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()


// will call controller func
router.post('/', CarControllers.createCar)

router.get('/',CarControllers.getAllCar)

router.get('/:carId',auth(USER_ROLE.user), CarControllers.getSingleCar)

router.put('/:carId', CarControllers.updateSingleCar)

router.delete('/:carId', CarControllers.deleteSingleCar)

export const CarRoutes = router;
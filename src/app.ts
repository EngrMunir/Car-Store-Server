import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { CarRoutes } from './modules/car/car.route'
import { OrderRoutes } from './modules/order/order.route'
import { RevenueRoutes } from './modules/revenue/revenue.routes'

const app:Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/cars', CarRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/orders/revenue', RevenueRoutes)

const getAController =  (req:Request, res:Response) => {
  const a=10;
res.send(a)
}

app.get('/', getAController)

export default app;
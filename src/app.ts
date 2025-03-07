import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import router from './app/routes'

const app:Application = express()

// parsers
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

// application routes
app.use('/api', router);

const getAController =  (req:Request, res:Response) => {
const a=10;
res.send(a)
}

app.get('/', getAController)

export default app;
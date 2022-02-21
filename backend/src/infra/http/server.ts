import 'reflect-metadata'
import express from 'express'
import { router } from './routes'

import '../typeorm'

const app = express()

app.use(express.json())

app.use(router)

app.listen(3333, () => console.log('App is running in port 3333!'))
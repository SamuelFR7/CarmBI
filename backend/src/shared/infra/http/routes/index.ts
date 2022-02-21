import { Router } from 'express'
import { weighingRoutes } from './weighings.routes'

const router = Router()

router.use('/weighings', weighingRoutes)

export { router }

import { Router } from 'express'
import { userRoutes } from './users.routes'
import { weighingRoutes } from './weighings.routes'

const router = Router()

router.use('/weighings', weighingRoutes)
router.use('/users', userRoutes)

export { router }

import Router from 'express'

import { CreateWeighingSummaryController } from '../controllers/createWeighingSummaryController'
import { ListWeighingSummaryController } from '../controllers/listWeighingSummaryController'

const weighingRoutes = Router()

const createWeighingSummaryController = new CreateWeighingSummaryController()
const listWeighingSummaryController = new ListWeighingSummaryController()

weighingRoutes.post('/', createWeighingSummaryController.handle)

weighingRoutes.get('/', listWeighingSummaryController.handle)

export { weighingRoutes }

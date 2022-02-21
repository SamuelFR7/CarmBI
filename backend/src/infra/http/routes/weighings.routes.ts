import Router from 'express'

import { CreateWeighingSummaryController } from '../../../application/useCases/createWeighingSummary/createWeighingSummaryController'
import { ListWeighingSummaryController } from '../../../application/useCases/listWeighingSummary/listWeighingSummaryController'

const weighingRoutes = Router()

const createWeighingSummaryController = new CreateWeighingSummaryController()
const listWeighingSummaryController = new ListWeighingSummaryController()

weighingRoutes.post('/', createWeighingSummaryController.handle)

weighingRoutes.get('/', listWeighingSummaryController.handle)

export { weighingRoutes }
import Router from 'express'

import { CreateWeighingSummaryController } from '@modules/weighings/useCases/createWeighingSummary/CreateWeighingSummaryController'
import { ListWeighingSummaryController } from '@modules/weighings/useCases/listWeighingSummary/ListWeighingSummaryController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const weighingRoutes = Router()

const createWeighingSummaryController = new CreateWeighingSummaryController()
const listWeighingSummaryController = new ListWeighingSummaryController()

weighingRoutes.post(
    '/',
    ensureAuthenticate,
    ensureAdmin,
    createWeighingSummaryController.handle
)
weighingRoutes.get(
    '/:producer/:lot',
    ensureAuthenticate,
    listWeighingSummaryController.handle
)

export { weighingRoutes }

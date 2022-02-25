import Router from 'express'

import { CreateWeighingSummaryController } from '@modules/weighings/useCases/createWeighingSummary/CreateWeighingSummaryController'
import { ListWeighingSummaryController } from '@modules/weighings/useCases/listWeighingSummary/ListWeighingSummaryController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListWeighingsLotsController } from '@modules/weighings/useCases/listWeighingsLots/ListWeighingsLotsController'

const weighingRoutes = Router()

const createWeighingSummaryController = new CreateWeighingSummaryController()
const listWeighingSummaryController = new ListWeighingSummaryController()
const listWeighingsLotsController = new ListWeighingsLotsController()

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
weighingRoutes.get(
    '/lots',
    ensureAuthenticate,
    listWeighingsLotsController.handle
)

export { weighingRoutes }

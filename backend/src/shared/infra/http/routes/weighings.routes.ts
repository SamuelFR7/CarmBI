import Router from 'express'

import { CreateWeighingSummaryController } from '@modules/weighings/useCases/createWeighingSummary/CreateWeighingSummaryController'
import { ListWeighingSummaryController } from '@modules/weighings/useCases/listWeighingSummary/ListWeighingSummaryController'
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ListWeighingsLotsController } from '@modules/weighings/useCases/listWeighingsLots/ListWeighingsLotsController'
import { ListWeighingUpdateTimeController } from '@modules/weighings/useCases/listWeighingUpdateTime/ListWeighingUpdateTimeController'

const weighingRoutes = Router()

const createWeighingSummaryController = new CreateWeighingSummaryController()
const listWeighingSummaryController = new ListWeighingSummaryController()
const listWeighingsLotsController = new ListWeighingsLotsController()
const listWeighingUpdateTime = new ListWeighingUpdateTimeController()

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
weighingRoutes.get('/time', ensureAuthenticate, listWeighingUpdateTime.handle)

export { weighingRoutes }

import Router from 'express'

import createWeighingSummaryController from '../../../application/useCases/createWeighingSummary'
import listWeighingSummaryController from '../../../application/useCases/listWeighingSummary'

const weighingRoutes = Router()

weighingRoutes.post('/', (req, res) => {
    return createWeighingSummaryController().handle(req, res)
})

weighingRoutes.get('/', (req, res) => {
    return listWeighingSummaryController().handle(req, res)
})

export { weighingRoutes }
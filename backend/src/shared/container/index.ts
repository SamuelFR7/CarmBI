import { container } from 'tsyringe'
import { IWeighingRepository } from '../../application/repositories/IWeighingRepository'
import { WeighingRepository } from '../../infra/database/repositories/WeighingRepository'

container.registerSingleton<IWeighingRepository>(
    'WeighingRepository',
    WeighingRepository
)

import { container } from 'tsyringe'
import { WeighingRepository } from '@modules/weighings/infra/typeorm/repositories/WeighingRepository'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'

container.registerSingleton<IWeighingRepository>(
    'WeighingRepository',
    WeighingRepository
)

import { container } from 'tsyringe'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { WeighingRepository } from '@modules/weighings/infra/prisma/repositories/WeighingRepository'

container.registerSingleton<IWeighingRepository>(
    'WeighingRepository',
    WeighingRepository
)

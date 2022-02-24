import { container } from 'tsyringe'
import { IWeighingRepository } from '@modules/weighings/repositories/IWeighingRepository'
import { WeighingRepository } from '@modules/weighings/infra/prisma/repositories/WeighingRepository'
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { UserRepository } from '@modules/users/infra/prisma/UserRepository'

container.registerSingleton<IWeighingRepository>(
    'WeighingRepository',
    WeighingRepository
)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

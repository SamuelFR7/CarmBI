import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController'
import { Router } from 'express'

const userRoutes = Router()

const createUserController = new CreateUserController()

userRoutes.post('/', createUserController.handle)

export { userRoutes }

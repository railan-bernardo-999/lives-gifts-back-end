
import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/auth';

const router = Router()
const userController = new UserController()

router.get('/users/:id', authMiddleware, userController.find)
router.get('/users/delete/:id', userController.delete)
router.put('/users/update/:id', userController.update)
router.get('/users', userController.index)
router.post('/users/register', userController.register)

export default router;
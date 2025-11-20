import { Router } from 'express'
import userRoutes from './users.routes'
import authRoutes from './auth.routes'

const router = Router();

router.use('/api/auth', authRoutes)
router.use('/api', userRoutes)

export default router
import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authMiddleware } from '../middlewares/auth';

const router = Router()
const auth = new AuthController();

router.post('/login', auth.login)
router.get('/verify', authMiddleware, auth.verifyToken);

// Rota protegida de exemplo
// router.get('/profile', authMiddleware, (req, res) => {
//   res.json({
//     message: 'Esta é uma rota protegida',
//     user: req.user
//   });
// });

export default router;
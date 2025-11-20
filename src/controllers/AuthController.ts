import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/users'
import { generateToken } from '../services/jwtService';

interface LoginData {
   email: string;
   password: string;
}

interface TokenPayload {
   id: number;
   email: string;
}

export class AuthController {
   async login(req: Request, res: Response) {
      try {
         const { email, password }: LoginData = req.body;

         // válida campos obrigatório
         if (!email || !password) {
            return res.status(400).json({
               error: 'Email e senha são obrigatórios'
            });
         }

         // busca usuário pelo e-mail
         const user = await User.findByEmail(email)
         if (!user) {
            return res.status(401).json({
               error: 'Credenciais inválidas'
            });
         }

         // verifica senha
         const isPasswordValid = await bcrypt.compare(password, user.password)
         if (!isPasswordValid) {
            return res.status(401).json({
               error: 'Credenciais inválidas'
            });
         }

         // Criar payload do token
         const payload: TokenPayload = {
            id: user.id!,
            email: user.email
         };

         // Gerar token JWT
         const token = generateToken({
            id: user.id!,
            email: user.email
         });

         // retorna token e informações do usuário
         const { password: _, ...userWithoutPassword } = user;

         return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
            user: userWithoutPassword
         })
      } catch (error: any) {
         console.error('Erro no login:', error);
         return res.status(500).json({
            error: error.message
         });
      }
   }

   // VERIFY TOKEN - Validar token
   async verifyToken(req: Request, res: Response) {
      try {
         const token = req.header('Authorization')?.replace('Bearer ', '');

         if (!token) {
            return res.status(401).json({
               error: 'Token não fornecido'
            });
         }

         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

         // Buscar usuário atualizado
         const user = await User.findById(decoded.id);
         if (!user) {
            return res.status(401).json({
               error: 'Usuário não encontrado'
            });
         }

         const { password: _, ...userWithoutPassword } = user;

         return res.status(200).json({
            valid: true,
            user: userWithoutPassword
         });

      } catch (error) {
         return res.status(401).json({
            valid: false,
            error: 'Token inválido ou expirado'
         });
      }
   }
}
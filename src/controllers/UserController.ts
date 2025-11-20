import type { Request, Response } from 'express'
import { User } from '../models/users'

// Interface extendida para incluir o user no request
interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export class UserController {

    // READ ALL
    async index(req: Request, res: Response) {
        try {
            const users = await User.findAll();

            res.status(200).json({
                data: users
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }

    }

    // CREATE
    async register(req: Request, res: Response) {
        try {
            const { name, email, password, document, phone, birthday } = req.body;

            // Validações básicas
            if (!name || !email || !password) {
                return res.status(400).json({
                    error: 'Nome, email e senha são obrigatórios'
                });
            }

            // Verificar se email já existe
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({
                    error: 'Email já cadastrado'
                });
            }

            // Verificar se documento já existe
            const existingDocumentUser = await User.findByDocument(document);
            if (existingDocumentUser) {
                return res.status(409).json({
                    error: 'CPF já em uso'
                });
            }

            // Verificar se telefone já existe
            const existingPhoneUser = await User.findByPhone(phone);
            if (existingPhoneUser) {
                return res.status(409).json({
                    error: 'Telefone já está cadastrado'
                });
            }

            // Criar usuário (a senha será hasheada no model)
            const user = await User.create({
                name,
                email,
                password,
                document,
                phone,
                birthday,
                verify_email: 'pending',
                verify_phone: 'pending'
            });

            // Remover senha do retorno
            const { password: _, ...userWithoutPassword } = user;

            return res.status(201).json({
                message: 'Usuário criado com sucesso',
                user: userWithoutPassword
            });

        } catch (error) {
            console.error('Erro no registro:', error);
            return res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }

    // UPDATE
    async update(req: Request, res: Response) {

        try {
            const userId: number = Number(req.params.id);
            const user = await User.update(userId, req.body)
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // READ ID
    async find(req: AuthRequest, res: Response) {
        try {
            const userId: number = Number(req.params.id);

            UserController.verifyAccess(res, req, userId)

            const user = await User.findById(userId)
            res.status(200).json({
                success: true,
                data: user
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // DELETE
    async delete(req: Request, res: Response) {
        try {
            const userId: number = Number(req.params.id);
            const user = await User.delete(userId)
            res.status(200).json({
                success: true,
                message: "Usuário deletado"
            })
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // verificação de autorização
    private static verifyAccess = (res: Response, req: AuthRequest, userId: number) => {

        if (req?.user?.id !== userId) {
            return res.status(403).json({
                success: false,
                message: 'Acesso negado. Você só pode visualizar seus próprios dados.'
            });
        }
    }
}

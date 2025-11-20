import db from '../../config/knex';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  document?: string;
  phone?: string;
  password: string;
  birthday?: string;
  key_pix?: string;
  verify_email?: string;
  verify_phone?: string;
  two_factor?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  // CREATE - registra um usuário
  static async create(userData: Omit<User, 'id'>): Promise<User> {
    // Hash da senha antes de salvar
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const [user] = await db('users')
      .insert({
        ...userData,
        password: hashedPassword
      })
      .returning('*');

    return user;
  }

  // READ - Busca um usuário por e-mail
  static async findByEmail(email: string): Promise<User | undefined> {
    return db('users').where({ email }).first();
  }

  // READ - Busca um usuário pelo documento
  static async findByDocument(document: string): Promise<User | undefined> {
    return db('users').where({ document }).first();
  }

  
  // READ - Busca um usuário pelo telefone
  static async findByPhone(phone: string): Promise<User | undefined> {
    return db('users').where({ phone }).first();
  }

  // READ - Busca um usuário por ID
  static async findById(id: number): Promise<User | undefined> {
    return db('users').where({ id }).first();
  }

  // READ - Busca todos os usuários 
  static async findAll(): Promise<User[]> {
    return db('users').select('*');
  }

  // UPDATE - Atualizar usuário
  static async update(id: number, userData: Partial<User>): Promise<User | undefined> {
    let updateData = { ...userData };

    // Se estiver atualizando a senha, fazer hash
    if (userData.password) {
      updateData.password = await bcrypt.hash(userData.password, 12);
    }

    const [user] = await db('users')
      .where({ id })
      .update({
        ...updateData,
        updated_at: new Date()
      })
      .returning('*');

    return user;
  }

  // DELETE - Deletar usuário
  static async delete(id: number): Promise<boolean> {
    const deletedCount = await db('users').where({ id }).delete();
    return deletedCount > 0; // Retorna true se deletou, false se não encontrou
  }

  // DELETE - Deletar e retornar usuário deletado (se precisar)
  static async findAndDelete(id: number): Promise<User | undefined> {
    const [user] = await db('users').where({ id }).delete().returning('*');
    return user;
  }
}
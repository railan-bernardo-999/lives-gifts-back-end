-- config/migrations/db.sql
-- Criar banco de dados (execute separadamente)
-- CREATE DATABASE lives_gifts;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  document VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) NOT NULL,
  birthday VARCHAR(255) DEFAULT NULL,
  key_pix VARCHAR(255) DEFAULT NULL,
  verify_email VARCHAR(255) DEFAULT NULL,
  verify_phone VARCHAR(255) DEFAULT NULL,
  two_factor VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo (CORRIGIDO)
INSERT INTO users (name, email, document, phone, password, birthday, key_pix, verify_email, verify_phone, two_factor) VALUES 
('João Silva', 'joao@email.com', '12345678900', '9999999999', 'senha123', '1995-07-08', 'chave_pix_joao', 'verified', 'verified', ''),
('Maria Santos', 'maria@email.com', '00987654321', '8888888888', 'senha456', '1990-01-15', 'chave_pix_maria', 'verified', 'verified', '')
ON CONFLICT (email) DO NOTHING;
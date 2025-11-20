require('dotenv').config();

console.log('🔍 Verificando variáveis de ambiente:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ CONFIGURADO' : '❌ NÃO CONFIGURADO');
console.log('JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN || '7d (padrão)');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);

// Testar manualmente o JWT
console.log('\n🧪 Testando JWT manualmente:');
try {
  const jwt = require('jsonwebtoken');
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    console.log('❌ JWT_SECRET não encontrado');
  } else {
    const token = jwt.sign({ test: true }, secret, { expiresIn: '1h' });
    console.log('✅ Token gerado com sucesso');
    
    const decoded = jwt.verify(token, secret);
    console.log('✅ Token verificado com sucesso');
  }
} catch (error) {
  console.log('❌ Erro no JWT:', error.message);
}
const knex = require('./config/knex');

async function testConnection() {
  try {
    console.log('🧪 Testando conexão com o banco de dados...');
    
    // Teste 1: Conexão básica
    const result = await knex.raw('SELECT version()');
    console.log('✅ Conexão bem-sucedida!');
    console.log('📊 Versão do PostgreSQL:', result.rows[0].version);
    
    // Teste 2: Listar bancos de dados
    const databases = await knex.raw('SELECT datname FROM pg_database WHERE datistemplate = false;');
    console.log('🗃️ Bancos disponíveis:');
    databases.rows.forEach(db => console.log('  -', db.datname));
    
    // Teste 3: Listar tabelas (se o banco existir)
    try {
      const tables = await knex.raw(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      
      console.log('📋 Tabelas no banco atual:');
      if (tables.rows.length === 0) {
        console.log('  (Nenhuma tabela encontrada)');
      } else {
        tables.rows.forEach(table => console.log('  -', table.table_name));
      }
    } catch (error) {
      console.log('ℹ️  Ainda não há tabelas no banco');
    }
    
    console.log('\n🎉 Tudo certo! Sua aplicação vai conseguir conectar.');
    
  } catch (error) {
    console.log('❌ ERRO NA CONEXÃO:', error.message);
    console.log('\n🔧 Verifique:');
    console.log('  1. Se o PostgreSQL está rodando');
    console.log('  2. As credenciais no knexfile.js');
    console.log('  3. Se o banco de dados existe');
  } finally {
    // Fechar conexão
    await knex.destroy();
  }
}

testConnection();
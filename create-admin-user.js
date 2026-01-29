/**
 * Script para criar utilizador administrador no Supabase
 *
 * INSTRUÇÕES DE USO:
 *
 * Método 1: Via Supabase Dashboard (RECOMENDADO)
 * 1. Aceder a https://app.supabase.com
 * 2. Selecionar o projeto
 * 3. Ir para Authentication > Users
 * 4. Clicar em "Add user" > "Create new user"
 * 5. Preencher:
 *    - Email: hugo.martins@mpgrupo.pt
 *    - Password: Crm2025*
 *    - Auto Confirm User: ✅ MARCAR
 * 6. Clicar em "Create user"
 *
 * Método 2: Via este script Node.js
 * 1. Executar: node create-admin-user.js
 *
 * NOTA: Este script requer as variáveis de ambiente:
 * - VITE_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (não incluída no .env por segurança)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas');
  console.log('\nPor favor, configure as seguintes variáveis:');
  console.log('- VITE_SUPABASE_URL (já configurada no .env)');
  console.log('- SUPABASE_SERVICE_ROLE_KEY (obter no Supabase Dashboard > Settings > API)');
  console.log('\nAlternativamente, use o método manual via Supabase Dashboard.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  console.log('🔄 A criar utilizador administrador...\n');

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'hugo.martins@mpgrupo.pt',
      password: 'Crm2025*',
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'Hugo Martins'
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('⚠️  Utilizador já existe no sistema');
        console.log('\nPode fazer login com as credenciais:');
        console.log('📧 Email: hugo.martins@mpgrupo.pt');
        console.log('🔒 Password: Crm2025*');
        return;
      }
      throw error;
    }

    console.log('✅ Utilizador criado com sucesso!\n');
    console.log('📋 Detalhes do utilizador:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email: ${data.user.email}`);
    console.log(`🆔 ID: ${data.user.id}`);
    console.log(`✅ Email confirmado: ${data.user.email_confirmed_at ? 'Sim' : 'Não'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🔒 Credenciais de acesso:');
    console.log('   Email: hugo.martins@mpgrupo.pt');
    console.log('   Password: Crm2025*');
    console.log('\n🌐 Aceder ao backoffice em: /login\n');

  } catch (error) {
    console.error('❌ Erro ao criar utilizador:', error.message);
    console.log('\n💡 Use o método manual via Supabase Dashboard:');
    console.log('   1. Aceder a Authentication > Users');
    console.log('   2. Clicar em "Add user" > "Create new user"');
    console.log('   3. Email: hugo.martins@mpgrupo.pt');
    console.log('   4. Password: Crm2025*');
    console.log('   5. Auto Confirm User: ✅ MARCAR\n');
  }
}

createAdminUser();

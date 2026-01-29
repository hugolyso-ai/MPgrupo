-- Script para criar o utilizador administrador no Supabase
-- Execute este script no SQL Editor do Supabase Dashboard

-- IMPORTANTE: Este script apenas cria o utilizador na tabela auth.users
-- É RECOMENDADO criar o utilizador através da interface do Supabase Dashboard:
-- 1. Aceder a Authentication > Users
-- 2. Clicar em "Add user" > "Create new user"
-- 3. Email: hugo.martins@mpgrupo.pt
-- 4. Password: Crm2025*
-- 5. Confirmar email automaticamente

-- Alternativamente, pode usar este script (menos recomendado):
-- NOTA: Este método requer que o email seja confirmado manualmente

/*
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'hugo.martins@mpgrupo.pt',
  crypt('Crm2025*', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);
*/

-- INSTRUÇÕES RECOMENDADAS:
-- 1. Aceder ao Supabase Dashboard
-- 2. Ir para Authentication > Users
-- 3. Clicar em "Add user"
-- 4. Selecionar "Create new user"
-- 5. Preencher:
--    - Email: hugo.martins@mpgrupo.pt
--    - Password: Crm2025*
--    - Auto Confirm User: SIM (marcar esta opção)
-- 6. Clicar em "Create user"

-- Verificar se o utilizador foi criado:
-- SELECT * FROM auth.users WHERE email = 'hugo.martins@mpgrupo.pt';

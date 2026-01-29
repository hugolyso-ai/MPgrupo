# 🔐 Criar Utilizador Administrador - Guia Passo a Passo

## ⚡ Método Rápido (Recomendado)

### 1️⃣ Aceder ao Supabase Dashboard
```
https://app.supabase.com
```

### 2️⃣ Selecionar o Projeto
- Clicar no projeto "MPGrupo Energy Simulator" (ou o nome que escolheu)

### 3️⃣ Ir para Authentication
- Menu lateral: **Authentication** > **Users**

### 4️⃣ Criar Novo Utilizador
- Clicar no botão **"Add user"** (canto superior direito)
- Selecionar **"Create new user"**

### 5️⃣ Preencher Dados
```
📧 Email Address:
   hugo.martins@mpgrupo.pt

🔒 Password:
   Crm2025*

✅ Auto Confirm User:
   [X] MARCAR ESTA OPÇÃO (importante!)
```

### 6️⃣ Confirmar
- Clicar em **"Create user"**
- Aguardar confirmação: "User created successfully"

---

## ✅ Verificar Criação

Após criar o utilizador, pode verificar:

1. O utilizador aparece na lista de Users
2. O email está confirmado (coluna "Confirmed")
3. O status está ativo

---

## 🚀 Testar Acesso

### 1. Aceder à aplicação
```
http://localhost:5173/login
(ou o URL da sua aplicação em produção)
```

### 2. Fazer login
```
Email: hugo.martins@mpgrupo.pt
Password: Crm2025*
```

### 3. Verificar acesso ao backoffice
- Deve ser redirecionado para `/admin-dashboard`
- Deve ver os separadores "Operadoras" e "Descontos"

---

## 🔧 Método Alternativo (Script Node.js)

Se preferir criar o utilizador via script:

### 1️⃣ Obter Service Role Key
1. No Supabase Dashboard: **Settings** > **API**
2. Copiar **"service_role" key** (secret!)
3. **⚠️ NUNCA partilhar ou commitar esta chave**

### 2️⃣ Configurar variável de ambiente
```bash
# Adicionar ao .env (NÃO commitar para Git!)
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

### 3️⃣ Instalar dependências
```bash
npm install dotenv
```

### 4️⃣ Executar script
```bash
node create-admin-user.js
```

---

## ❌ Resolução de Problemas

### Erro: "User already registered"
✅ O utilizador já existe. Pode fazer login normalmente.

### Erro: "Email not confirmed"
1. Voltar ao Supabase Dashboard
2. Authentication > Users
3. Clicar no utilizador
4. Clicar em "Confirm email"

### Erro: "Invalid login credentials"
1. Verificar que está a usar o email correto: `hugo.martins@mpgrupo.pt`
2. Verificar que a password está correta: `Crm2025*`
3. Verificar que o email foi confirmado no Supabase

### Não consigo aceder ao backoffice
1. Verificar que está autenticado (fazer login primeiro)
2. Verificar que o email é exatamente: `hugo.martins@mpgrupo.pt`
3. Ver console do browser (F12) para erros

---

## 📝 Notas Importantes

1. **Segurança**: A password `Crm2025*` deve ser alterada após primeiro login
2. **Email único**: Apenas este email tem acesso ao backoffice
3. **RLS**: As políticas de segurança garantem que apenas este utilizador pode modificar dados
4. **Sessão**: O login persiste automaticamente (Supabase Auth)

---

## 🎯 Próximos Passos

Após criar o utilizador administrador:

1. ✅ Fazer login no backoffice
2. ✅ Adicionar operadoras parceiras
3. ✅ Configurar tarifas e descontos
4. ✅ Testar simulador
5. ✅ Deploy em produção

---

## 📞 Suporte

Se encontrar problemas:
1. Verificar variáveis de ambiente no `.env`
2. Verificar logs no console do browser
3. Verificar logs no Supabase Dashboard (Logs & Analytics)
4. Consultar documentação: [Supabase Auth Docs](https://supabase.com/docs/guides/auth)

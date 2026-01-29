# ✅ Checklist de Setup - Simulador de Poupança Energética

## 📋 Antes de Começar

### Pré-requisitos
- [ ] Node.js 18+ instalado
- [ ] npm ou yarn instalado
- [ ] Conta no Supabase
- [ ] Conta no GitHub (para deploy Vercel)
- [ ] Conta na Vercel (opcional, para produção)

---

## 🗄️ Parte 1: Configuração da Base de Dados

### 1.1 Criar Projeto Supabase
- [ ] Aceder a https://app.supabase.com
- [ ] Clicar em "New project"
- [ ] Nome: "MPGrupo Energy Simulator" (ou similar)
- [ ] Password da DB: (guardar com segurança)
- [ ] Região: Europe West (ou mais próxima)
- [ ] Aguardar criação (~2 minutos)

### 1.2 Obter Credenciais
- [ ] Ir para Settings > API
- [ ] Copiar **Project URL**
- [ ] Copiar **anon public key**
- [ ] Guardar num local seguro

### 1.3 Aplicar Migrações
- [ ] Ir para SQL Editor no Supabase Dashboard
- [ ] Copiar conteúdo de `supabase/migrations/create_energy_simulator_schema.sql`
- [ ] Colar no editor e executar
- [ ] Verificar sucesso: ver tabelas em Database > Tables

### 1.4 Verificar Tabelas
- [ ] Tabela `operadoras` existe
- [ ] Tabela `configuracoes_descontos` existe
- [ ] RLS está habilitado em ambas
- [ ] Políticas foram criadas

---

## 👤 Parte 2: Criar Utilizador Administrador

### Método Recomendado (Dashboard)
- [ ] Ir para Authentication > Users
- [ ] Clicar em "Add user" > "Create new user"
- [ ] Email: `hugo.martins@mpgrupo.pt`
- [ ] Password: `Crm2025*`
- [ ] ✅ MARCAR "Auto Confirm User"
- [ ] Clicar em "Create user"
- [ ] Verificar que aparece na lista
- [ ] Verificar coluna "Confirmed" = Yes

### Alternativa (Script)
- [ ] Obter Service Role Key (Settings > API)
- [ ] Adicionar ao .env: `SUPABASE_SERVICE_ROLE_KEY=...`
- [ ] Executar: `node create-admin-user.js`
- [ ] Verificar output de sucesso

---

## ⚙️ Parte 3: Configuração Local

### 3.1 Clonar/Baixar Projeto
```bash
# Se via Git
git clone [repository-url]
cd [project-folder]

# Ou extrair ZIP e navegar para pasta
```

### 3.2 Instalar Dependências
```bash
npm install
```
- [ ] Aguardar instalação completa
- [ ] Verificar que não há erros críticos

### 3.3 Configurar Variáveis de Ambiente
- [ ] Abrir ficheiro `.env`
- [ ] Atualizar `VITE_SUPABASE_URL` com Project URL
- [ ] Atualizar `VITE_SUPABASE_ANON_KEY` com anon key
- [ ] Guardar ficheiro

**Exemplo do .env:**
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.4 Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```
- [ ] Servidor inicia sem erros
- [ ] Abrir http://localhost:5173
- [ ] Página carrega corretamente

---

## 🔐 Parte 4: Testar Autenticação

### 4.1 Aceder ao Login
- [ ] Ir para http://localhost:5173/login
- [ ] Página de login carrega
- [ ] Form visível

### 4.2 Fazer Login
- [ ] Email: `hugo.martins@mpgrupo.pt`
- [ ] Password: `Crm2025*`
- [ ] Clicar "Entrar"
- [ ] Redireciona para `/admin-dashboard`
- [ ] Dashboard carrega sem erros

### 4.3 Testar Backoffice
- [ ] Tab "Operadoras" visível
- [ ] Tab "Descontos" visível
- [ ] Botão "Nova Operadora" funciona
- [ ] Botão "Sair" funciona

---

## 🏢 Parte 5: Adicionar Dados de Teste

### 5.1 Adicionar Operadora de Teste

**Via Interface:**
- [ ] No backoffice, clicar "Nova Operadora"
- [ ] Preencher dados:
  - Nome: EDP Comercial
  - Logótipo: (URL de imagem pública)
  - Valor kWh Simples: 0.18
  - Valor kWh Vazio: 0.12
  - Valor kWh Fora Vazio: 0.20
  - Valor kWh Ponta: 0.25
  - Valor kWh Cheias: 0.21
- [ ] Preencher valores de potência:
  - 1.15 kVA: 0.15
  - 2.3 kVA: 0.30
  - 6.9 kVA: 0.90
  - (continuar para outras potências)
- [ ] Marcar "Operadora ativa"
- [ ] Clicar "Criar"
- [ ] Verificar sucesso

**Via SQL (Opcional):**
- [ ] Usar script `seed_data.sql`
- [ ] Executar no SQL Editor
- [ ] Verificar dados inseridos

### 5.2 Configurar Descontos
- [ ] Ir para tab "Descontos"
- [ ] Selecionar operadora criada
- [ ] Configurar:
  - DD Potência: 2%
  - DD Energia: 1.5%
  - FE Potência: 1%
  - FE Energia: 0.5%
- [ ] Clicar "Guardar"
- [ ] Verificar mensagem de sucesso

---

## 🧪 Parte 6: Testar Simulador

### 6.1 Aceder ao Simulador
- [ ] Ir para página principal (/)
- [ ] Ver botão lateral direito (retrátil)
- [ ] Clicar no botão para expandir
- [ ] Ver opções: Simulador, LinkedIn, Facebook, WhatsApp

### 6.2 Abrir Simulador
- [ ] Clicar em "Simulador"
- [ ] Dialog abre
- [ ] Form visível com todos os campos

### 6.3 Preencher Simulação
- [ ] Operadora Atual: (selecionar qualquer)
- [ ] Potência: 6.9 kVA
- [ ] Dias da Fatura: 30
- [ ] Ciclo Horário: Simples
- [ ] kWh Consumidos: 300
- [ ] Preço: 0.20
- [ ] Marcar "Débito Direto"
- [ ] Marcar "Fatura Eletrónica"

### 6.4 Ver Resultados
- [ ] Clicar "Simular Poupança"
- [ ] Tabela de resultados aparece
- [ ] Operadoras listadas com logotipos
- [ ] Valores calculados corretamente
- [ ] Poupança destacada
- [ ] Nota de DD+FE aparece (se aplicável)

### 6.5 Testar CTAs
- [ ] Scroll pela página principal
- [ ] Ver 3 CTAs diferentes:
  - Após "Sobre Nós" (compacto)
  - Após "Serviços" (completo/hero)
  - Após "Filosofia" (compacto)
- [ ] Clicar em cada um
- [ ] Todos abrem o simulador

---

## 🎨 Parte 7: Personalização

### 7.1 Atualizar Links Sociais
- [ ] Abrir `src/components/FloatingActionButtons.tsx`
- [ ] Localizar array `socialLinks`
- [ ] Atualizar URLs:
  ```typescript
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/[seu-perfil]',
    ...
  },
  {
    icon: Facebook,
    href: 'https://facebook.com/[sua-pagina]',
    ...
  },
  {
    icon: Phone,
    href: 'https://wa.me/351[seu-numero]',
    ...
  }
  ```
- [ ] Guardar ficheiro

### 7.2 Testar Links
- [ ] Restart dev server
- [ ] Clicar em cada link social
- [ ] Verificar que abrem URLs corretos
- [ ] Abrem em nova tab

### 7.3 Adicionar Mais Operadoras
- [ ] Repetir processo de adicionar operadora
- [ ] Adicionar pelo menos 3-4 operadoras
- [ ] Configurar descontos para todas
- [ ] Testar simulador com múltiplas opções

---

## 🚀 Parte 8: Build e Deploy

### 8.1 Testar Build Local
```bash
npm run build
```
- [ ] Build completa sem erros
- [ ] Pasta `dist/` criada
- [ ] Verificar warnings (OK se apenas bundle size)

### 8.2 Testar Preview Local
```bash
npm run preview
```
- [ ] Preview server inicia
- [ ] Testar funcionalidades principais
- [ ] Verificar que tudo funciona

### 8.3 Deploy na Vercel

**Preparar Repositório:**
- [ ] Criar repo no GitHub
- [ ] Push código:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin [repo-url]
  git push -u origin main
  ```

**Configurar Vercel:**
- [ ] Aceder a https://vercel.com
- [ ] Login com GitHub
- [ ] "Add New Project"
- [ ] Selecionar repositório
- [ ] Configure:
  - Framework: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Adicionar Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Clicar "Deploy"
- [ ] Aguardar deploy (~2 min)

**Verificar Deploy:**
- [ ] Aceder URL fornecida pela Vercel
- [ ] Testar página principal
- [ ] Testar login
- [ ] Testar simulador
- [ ] Testar backoffice

### 8.4 Configurar Domínio (Opcional)
- [ ] Settings > Domains
- [ ] Add domain
- [ ] Seguir instruções DNS
- [ ] Aguardar propagação
- [ ] Testar domínio customizado

---

## 🔒 Parte 9: Segurança

### 9.1 Verificar RLS
- [ ] No Supabase, ir para Authentication > Policies
- [ ] Verificar políticas criadas
- [ ] Testar que apenas admin pode modificar

### 9.2 Backup Inicial
- [ ] No Supabase, ir para Settings > Database
- [ ] Criar backup manual
- [ ] Guardar backup localmente

### 9.3 Secrets
- [ ] Verificar que `.env` está no `.gitignore`
- [ ] Nunca commitar Service Role Key
- [ ] Documentar onde estão as chaves (password manager)

---

## 📊 Parte 10: Monitorização

### 10.1 Configurar Alerts (Supabase)
- [ ] Settings > Usage
- [ ] Ver limites do plan
- [ ] Configurar alertas (se disponível)

### 10.2 Testar Error Handling
- [ ] Tentar login com credenciais erradas
- [ ] Verificar mensagem de erro
- [ ] Tentar criar operadora sem dados obrigatórios
- [ ] Verificar validação

### 10.3 Analytics (Opcional)
- [ ] Adicionar Google Analytics
- [ ] Configurar conversões
- [ ] Testar tracking

---

## ✅ Checklist Final

### Funcional
- [ ] ✅ Autenticação funciona
- [ ] ✅ Backoffice acessível
- [ ] ✅ CRUD de operadoras funciona
- [ ] ✅ Descontos podem ser configurados
- [ ] ✅ Simulador abre e funciona
- [ ] ✅ Cálculos corretos
- [ ] ✅ Resultados aparecem
- [ ] ✅ Links sociais funcionam
- [ ] ✅ CTAs funcionam
- [ ] ✅ Menu lateral funciona

### Performance
- [ ] ✅ Página carrega < 3s
- [ ] ✅ Animações suaves
- [ ] ✅ Sem erros no console
- [ ] ✅ Responsivo (mobile + desktop)

### Segurança
- [ ] ✅ RLS habilitado
- [ ] ✅ Apenas admin tem acesso
- [ ] ✅ Credenciais seguras
- [ ] ✅ HTTPS habilitado (Vercel auto)

### Conteúdo
- [ ] ✅ Operadoras adicionadas
- [ ] ✅ Tarifas configuradas
- [ ] ✅ Descontos configurados
- [ ] ✅ Links sociais atualizados
- [ ] ✅ Logotipos funcionam

---

## 🎉 Projeto Completo!

Parabéns! O simulador está configurado e pronto para uso.

### Próximos Passos Recomendados:
1. Adicionar mais operadoras do mercado
2. Refinar tarifas com dados reais
3. Testar com utilizadores reais
4. Coletar feedback
5. Iterar e melhorar

### Documentação de Referência:
- `README.md` - Visão geral
- `SIMULATOR_README.md` - Documentação técnica
- `QUICK_START.md` - Guia rápido
- `UPDATES.md` - Novas funcionalidades
- `COMPONENT_STRUCTURE.md` - Arquitetura
- `DEPLOY_VERCEL.md` - Deploy detalhado
- `CREATE_ADMIN_INSTRUCTIONS.md` - Criar admin

---

**Tempo Estimado Total:** 1-2 horas
**Dificuldade:** Média
**Última atualização:** 2024

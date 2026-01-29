# Guia de Deploy na Vercel

## Pré-requisitos

1. Conta no GitHub
2. Conta na Vercel (https://vercel.com)
3. Projeto Supabase configurado
4. Repositório GitHub com o código

## Passo 1: Preparar o Repositório GitHub

1. Criar um novo repositório no GitHub
2. Fazer push do código para o repositório:

```bash
git init
git add .
git commit -m "Initial commit - Energy Savings Simulator"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repositorio.git
git push -u origin main
```

## Passo 2: Configurar Projeto na Vercel

1. Aceder a https://vercel.com
2. Fazer login com GitHub
3. Clicar em **"Add New..."** > **"Project"**
4. Selecionar o repositório do GitHub
5. Configurar o projeto:

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Environment Variables
Adicionar as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

**Onde encontrar estas variáveis:**
1. Aceder ao Supabase Dashboard
2. Ir para Settings > API
3. Copiar:
   - Project URL → `VITE_SUPABASE_URL`
   - anon public → `VITE_SUPABASE_ANON_KEY`

6. Clicar em **"Deploy"**

## Passo 3: Aguardar Deploy

O deploy demora 1-3 minutos. A Vercel irá:
1. Clonar o repositório
2. Instalar dependências
3. Fazer build do projeto
4. Publicar o site

## Passo 4: Verificar Deploy

1. Após deploy bem-sucedido, clicar no URL do projeto
2. Verificar que a página principal carrega
3. Testar o simulador
4. Aceder a `/login` e verificar autenticação
5. Aceder a `/admin-dashboard` (após login)

## Passo 5: Configurar Domínio Personalizado (Opcional)

1. Na Vercel, ir para Settings > Domains
2. Clicar em **"Add Domain"**
3. Inserir o domínio (ex: simulador.mpgrupo.pt)
4. Seguir instruções para configurar DNS

### Configuração DNS
Adicionar registos no provedor DNS:

```
Type: CNAME
Name: simulador (ou @)
Value: cname.vercel-dns.com
```

## Passo 6: Configurar Redirects (se necessário)

O ficheiro `vercel.json` já está configurado para garantir que as rotas funcionam corretamente em SPA.

## Passo 7: Configurar Atualizações Automáticas

A Vercel já está configurada para:
- Deploy automático quando push para branch `main`
- Preview deploys para pull requests
- Rollback automático em caso de erro

## Monitorização

### Ver Logs de Deploy
1. Aceder ao projeto na Vercel
2. Ir para "Deployments"
3. Clicar no deploy específico
4. Ver logs de build e runtime

### Analytics
1. Na Vercel, ir para Analytics
2. Ver métricas de performance
3. Monitorizar erros e tráfego

## Troubleshooting

### Build Falha
- Verificar se todas as dependências estão no `package.json`
- Ver logs de build na Vercel
- Testar `npm run build` localmente

### Variáveis de Ambiente Não Funcionam
- Verificar que as variáveis começam com `VITE_`
- Confirmar que foram adicionadas nas Settings da Vercel
- Fazer redeploy após adicionar variáveis

### Rotas Retornam 404
- Verificar que `vercel.json` existe na raiz do projeto
- Confirmar configuração de rewrites no `vercel.json`

### Erros de Autenticação
- Verificar se as variáveis do Supabase estão corretas
- Confirmar que o utilizador foi criado no Supabase
- Ver console do browser para erros específicos

## URLs Importantes

- **Dashboard Vercel:** https://vercel.com/dashboard
- **Docs Vercel:** https://vercel.com/docs
- **Suporte Vercel:** https://vercel.com/support

## Comandos Úteis

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Deploy manual via CLI
vercel

# Deploy para produção
vercel --prod

# Ver logs
vercel logs

# Listar deploys
vercel ls
```

## Segurança

1. **Nunca** committar ficheiro `.env` para o repositório
2. Usar sempre variáveis de ambiente da Vercel para dados sensíveis
3. Ativar HTTPS (automático na Vercel)
4. Configurar CORS no Supabase se necessário

## Performance

A Vercel oferece:
- CDN global
- Compressão automática
- Caching inteligente
- SSL/TLS automático
- HTTP/2

## Custos

- Plan gratuito: 100GB bandwidth, deployments ilimitados
- Para produção, considerar planos pagos se necessário

## Próximos Passos

1. Configurar domínio personalizado
2. Ativar analytics
3. Configurar notificações de deploy
4. Setup CI/CD avançado (se necessário)
5. Monitorizar performance e erros

## Suporte

Para questões técnicas:
- Documentação Vercel: https://vercel.com/docs
- Suporte Vercel: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

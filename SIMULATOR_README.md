# Simulador de Poupança Energética - MPGrupo

## Visão Geral

Aplicação profissional de simulação de poupança energética com backoffice administrativo protegido. Permite comparar tarifas de diferentes operadoras e calcular potenciais poupanças.

## Funcionalidades Principais

### 1. Backoffice Administrativo (/admin-dashboard)

**Acesso Protegido:**
- Email: hugo.martins@mpgrupo.pt
- Password: Crm2025*

**Gestão de Operadoras:**
- CRUD completo de operadoras parceiras
- Upload de logotipos (URL)
- Configuração de tarifas kWh (Simples, Vazio, Fora de Vazio, Ponta, Cheias)
- Valores diários por potência (1.15 a 41.4 kVA)

**Configuração de Descontos:**
- % de desconto para Débito Direto (DD) aplicável ao Termo de Potência e Termo de Energia
- % de desconto para Fatura Eletrónica (FE) aplicável ao Termo de Potência e Termo de Energia
- Descontos aplicáveis individualmente a cada operadora

### 2. Simulador de Poupança (Frontend)

**Acesso:**
- Botão flutuante fixo no lado direito da página: "Simule aqui a sua poupança!"

**Inputs do Cliente:**
- Operadora Atual (picklist de operadoras do mercado livre português)
- Potência Contratada (1.15 a 41.4 kVA)
- Dias da Fatura
- Ciclo Horário (Simples, Bi-Horário, Tri-Horário)

**Campos Dinâmicos por Ciclo:**
- **Simples:** kWh consumidos e Preço (€/kWh)
- **Bi-Horário:** kWh e Preços para Vazio e Fora de Vazio
- **Tri-Horário:** kWh e Preços para Vazio, Ponta e Cheias

**Opções:**
- Toggle para Débito Direto (DD)
- Toggle para Fatura Eletrónica (FE)

### 3. Resultados da Simulação

**Tabela Comparativa:**
- Operadora Atual vs Operadoras Parceiras (com logotipos)
- Valor Potência Diária
- Custo Total Potência
- Valores kWh por Ciclo
- Custo Total Energia
- Subtotal
- Poupança (destacada visualmente)

**Funcionalidades Especiais:**
- Destaque visual para operadora com maior poupança
- Alerta de poupança adicional se não aderir a DD+FE
- Mensagem: "Poderia poupar mais [X]€ se aderisse a DD e FE"

## Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Animações:** Framer Motion
- **Base de Dados:** Supabase (PostgreSQL)
- **Autenticação:** Supabase Auth
- **Deploy:** Vercel (configurado para SPA)

## Estrutura de Base de Dados

### Tabela: operadoras
- id, nome, logotipo_url
- valor_kwh_simples, valor_kwh_vazio, valor_kwh_fora_vazio
- valor_kwh_ponta, valor_kwh_cheias
- valor_diario_potencias (JSONB)
- ativa (boolean)

### Tabela: configuracoes_descontos
- id, operadora_id
- desconto_dd_potencia, desconto_dd_energia
- desconto_fe_potencia, desconto_fe_energia

## Segurança

- Row Level Security (RLS) habilitado em todas as tabelas
- Apenas utilizador autenticado com email específico pode modificar dados
- Todos os utilizadores autenticados podem visualizar dados

## Lógica de Cálculo

1. **Custo Atual:** Calculado com base nos inputs do cliente
2. **Custo Operadora:** Calculado usando tarifas configuradas no backoffice
3. **Descontos:** Aplicados ao Termo de Potência e Termo de Energia separadamente
4. **Poupança:** Diferença entre custo atual e custo com operadora parceira

## Configuração

### Variáveis de Ambiente (.env)

As variáveis já estão configuradas no ficheiro .env:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

### Criar Utilizador Administrador

Antes de usar o backoffice, é necessário criar o utilizador no Supabase:

1. Aceder ao Dashboard do Supabase
2. Ir a Authentication > Users
3. Criar novo utilizador:
   - Email: hugo.martins@mpgrupo.pt
   - Password: Crm2025*

## Deploy na Vercel

O projeto está configurado para deploy na Vercel:

1. Conectar repositório GitHub à Vercel
2. As variáveis de ambiente serão automaticamente importadas
3. O ficheiro `vercel.json` garante que as rotas funcionam corretamente em SPA

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview

# Testes
npm run test
```

## Fluxo de Utilização

### Para Administrador:
1. Aceder a /login
2. Entrar com credenciais
3. Gerir operadoras e configurar descontos
4. Sair

### Para Utilizador Final:
1. Visitar página principal
2. Clicar no botão flutuante "Simule aqui a sua poupança!"
3. Preencher dados da fatura atual
4. Ver resultados comparativos
5. Identificar melhor opção de poupança

## Notas Importantes

- Logotipos devem estar hospedados externamente (URLs)
- Tamanho recomendado para logotipos: 120x60px
- Valores de kWh devem ter até 6 casas decimais
- Descontos são acumulativos se DD e FE forem selecionados
- Apenas operadoras ativas aparecem no simulador

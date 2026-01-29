# Guia Rápido de Início - Simulador de Poupança Energética

## Passo 1: Criar Utilizador Administrador no Supabase

1. Aceder ao [Supabase Dashboard](https://app.supabase.com)
2. Selecionar o seu projeto
3. Ir para **Authentication** > **Users**
4. Clicar em **"Add user"** > **"Create new user"**
5. Preencher os dados:
   - **Email:** `hugo.martins@mpgrupo.pt`
   - **Password:** `Crm2025*`
   - **Auto Confirm User:** ✅ MARCAR
6. Clicar em **"Create user"**

## Passo 2: Adicionar Operadoras

1. Aceder a `/login` na aplicação
2. Fazer login com as credenciais do administrador
3. No separador **"Operadoras"**, clicar em **"Nova Operadora"**
4. Preencher os dados:
   - Nome da operadora
   - URL do logótipo (ex: https://exemplo.com/logo.png)
   - Tarifas kWh para cada ciclo horário
   - Valores diários para cada potência (1.15 a 41.4 kVA)
   - Marcar como "Ativa"
5. Clicar em **"Criar"**
6. Repetir para adicionar mais operadoras

## Passo 3: Configurar Descontos

1. No backoffice, ir ao separador **"Descontos"**
2. Para cada operadora, configurar:
   - % Desconto DD (Débito Direto) no Termo de Potência
   - % Desconto DD no Termo de Energia
   - % Desconto FE (Fatura Eletrónica) no Termo de Potência
   - % Desconto FE no Termo de Energia
3. Clicar em **"Guardar"** para cada operadora

## Passo 4: Testar o Simulador

1. Na página principal, clicar no botão flutuante **"Simule aqui a sua poupança!"**
2. Preencher os dados do cliente:
   - Operadora Atual
   - Potência Contratada
   - Dias da Fatura
   - Ciclo Horário
   - Consumos (kWh) e Preços
3. Selecionar opções de DD e FE (se aplicável)
4. Clicar em **"Simular Poupança"**
5. Ver os resultados comparativos

## Exemplo de Operadora

Para teste rápido, pode usar estes dados de exemplo:

**Operadora:** EDP Comercial
- **Logótipo:** (URL de uma imagem 120x60px)
- **Valor kWh Simples:** 0.180000
- **Valor kWh Vazio:** 0.120000
- **Valor kWh Fora de Vazio:** 0.200000
- **Valor kWh Ponta:** 0.250000
- **Valor kWh Cheias:** 0.210000
- **Valores Diários por Potência:**
  - 1.15 kVA: 0.15
  - 2.3 kVA: 0.30
  - 3.45 kVA: 0.45
  - 6.9 kVA: 0.90
  - (continuar para todas as potências)

**Descontos:**
- DD Potência: 2%
- DD Energia: 1.5%
- FE Potência: 1%
- FE Energia: 0.5%

## URLs Importantes

- **Página Principal:** `/`
- **Login Backoffice:** `/login`
- **Dashboard Admin:** `/admin-dashboard`

## Resolução de Problemas

### Não consigo fazer login
- Verificar se o utilizador foi criado no Supabase
- Verificar se o email foi confirmado (Auto Confirm User)
- Confirmar que está a usar o email correto: hugo.martins@mpgrupo.pt

### Simulador não mostra operadoras
- Verificar se existem operadoras marcadas como "Ativas"
- Confirmar que as tarifas e potências foram preenchidas
- Ver console do browser para erros

### Descontos não aparecem nos resultados
- Verificar se os descontos foram guardados para cada operadora
- Confirmar que DD e/ou FE foram selecionados no simulador
- Verificar valores dos descontos (devem ser percentagens, ex: 2 para 2%)

## Próximos Passos

1. Adicionar todas as operadoras parceiras
2. Configurar tarifas competitivas
3. Testar diferentes cenários de simulação
4. Ajustar descontos conforme estratégia comercial
5. Preparar deploy para produção

## Suporte

Para questões técnicas, consultar o ficheiro `SIMULATOR_README.md` com documentação completa.

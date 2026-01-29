# Configuração do Resend para Envio de Emails

## Visão Geral

O formulário de contacto agora está configurado para enviar emails automáticos através do Resend, incluindo suporte para anexos (faturas em PDF, JPG ou PNG até 5MB).

## Funcionalidades Implementadas

### 1. Upload de Arquivos
- Campo de upload no formulário (Step 3)
- Suporta: PDF, JPG, PNG
- Tamanho máximo: 5MB
- Preview do arquivo selecionado com opção de remoção

### 2. Envio de Email
- **Para:** hugo.martins@mpgrupo.pt
- **CC:** marcio.pinto@mpgrupo.pt
- **De:** info@mpgrupo.pt
- Email formatado em HTML com design profissional
- Inclui anexo se fornecido pelo cliente
- Dados da simulação (se aplicável)

### 3. Persistência
- Dados salvos na tabela `pedidos_contacto`
- Inclui nome do arquivo anexado (coluna `anexo_nome`)

## Configuração do Resend (OBRIGATÓRIO)

### Passo 1: Criar Conta no Resend
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Confirme seu email

### Passo 2: Verificar Domínio
Para enviar emails através de `info@mpgrupo.pt`, você precisa verificar o domínio no Resend:

1. No painel do Resend, vá em **Domains** → **Add Domain**
2. Digite: `mpgrupo.pt`
3. O Resend fornecerá registros DNS que você precisa adicionar:

```
Tipo: TXT
Nome: resend._domainkey
Valor: [valor fornecido pelo Resend]

Tipo: MX
Nome: @
Valor: feedback-smtp.resend.com
Prioridade: 10
```

4. Adicione estes registros no painel de gestão DNS do domínio mpgrupo.pt
5. Aguarde a verificação (pode levar alguns minutos)

### Passo 3: Obter API Key
1. No Resend, vá em **API Keys**
2. Clique em **Create API Key**
3. Nome: "MPgrupo Contact Form"
4. Permissões: **Sending access**
5. Copie a API Key gerada (ela só será mostrada uma vez!)

### Passo 4: Configurar na Supabase
1. Acesse o [painel Supabase](https://supabase.com/dashboard)
2. Vá em **Edge Functions** → **send-contact-email**
3. Clique em **Secrets**
4. Adicione um novo secret:
   - **Nome:** `RESEND_API_KEY`
   - **Valor:** [cole a API Key do Resend aqui]
5. Salve

## Testando o Sistema

### 1. Teste Básico (sem anexo)
1. Acesse o formulário de contacto no site
2. Preencha os dados:
   - Nome, Email, Telefone
   - Selecione um assunto
   - Escreva uma mensagem
3. Clique em "Enviar"
4. Verifique se o email chegou em:
   - hugo.martins@mpgrupo.pt
   - marcio.pinto@mpgrupo.pt (CC)

### 2. Teste com Anexo
1. Repita o processo acima
2. No Step 3, clique em "Anexar Fatura"
3. Selecione um arquivo PDF ou imagem
4. Envie o formulário
5. Verifique se o email contém o anexo

### 3. Teste com Dados de Simulação
1. Faça uma simulação no Simulador de Energia
2. Nos resultados, clique em "Pedir Contacto"
3. Preencha o formulário
4. O email deve incluir os dados da simulação (operadora, potência, poupança)

## Estrutura do Email

O email enviado contém:

```
┌─────────────────────────────────────┐
│ Novo Pedido de Contacto             │
│ (Header com cor dourada)            │
├─────────────────────────────────────┤
│ [Assunto do Pedido]                 │
│                                     │
│ Dados do Cliente:                   │
│ • Nome                              │
│ • Email                             │
│ • Telefone                          │
│                                     │
│ Dados da Simulação: (se aplicável)  │
│ • Operadora Atual                   │
│ • Operadora de Interesse            │
│ • Potência                          │
│ • Poupança Estimada                 │
│                                     │
│ Mensagem:                           │
│ [Mensagem do cliente]               │
│                                     │
│ 📎 Anexo: [nome_arquivo.pdf]        │
└─────────────────────────────────────┘
```

## Monitoramento

### Verificar Logs da Edge Function
```bash
# Via Supabase Dashboard
1. Vá em Edge Functions → send-contact-email
2. Clique em "Logs"
3. Veja os requests e possíveis erros
```

### Verificar Status no Resend
1. Acesse [resend.com/emails](https://resend.com/emails)
2. Veja todos os emails enviados
3. Status de entrega, bounces, etc.

## Limites do Plano Gratuito Resend

- **3.000 emails/mês** (plano gratuito)
- **100 emails/dia**
- Anexos até **40MB** por email

Se precisar de mais, considere upgrade para plano pago.

## Troubleshooting

### Email não está sendo enviado

1. **Verifique a API Key:**
   - Certifique-se que está configurada corretamente na Supabase
   - Nome exato: `RESEND_API_KEY`

2. **Verifique o Domínio:**
   - O domínio `mpgrupo.pt` está verificado no Resend?
   - Status deve estar "Verified"

3. **Verifique os Logs:**
   - Supabase Edge Functions → Logs
   - Resend Dashboard → Emails

### Anexo não está chegando

1. Verifique o tamanho do arquivo (máx 5MB)
2. Verifique o formato (PDF, JPG, PNG)
3. Veja os logs da Edge Function para erros

### Email vai para Spam

1. Configure SPF e DKIM corretamente no DNS
2. Verifique se o domínio está verificado no Resend
3. Adicione um registro DMARC no DNS:
```
Tipo: TXT
Nome: _dmarc
Valor: v=DMARC1; p=none; rua=mailto:dmarc@mpgrupo.pt
```

## Alternativa: Usar SMTP Direto (NÃO RECOMENDADO)

Embora você tenha credenciais SMTP (`mail.mpgrupo.pt`), **NÃO recomendamos usar SMTP direto** porque:
- Menor taxa de entrega
- Problemas com spam
- Mais complexo de configurar
- Sem analytics
- Sem retry automático

O Resend é a solução profissional e recomendada para envio transacional.

## Suporte

Se tiver problemas:
1. Verifique os logs da Edge Function
2. Consulte a [documentação do Resend](https://resend.com/docs)
3. Verifique se o domínio está verificado

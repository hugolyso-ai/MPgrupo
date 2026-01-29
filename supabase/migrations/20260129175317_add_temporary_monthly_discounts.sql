/*
  # Adicionar Descontos Temporários Mensais

  ## Descrição
  Esta migração adiciona suporte para descontos temporários (promocionais) que são
  aplicados mensalmente durante um período específico de meses. Estes descontos são
  úteis para campanhas promocionais limitadas no tempo.

  ## Mudanças

  ### Novas Colunas em `configuracoes_descontos`:
  - `desconto_mensal_temporario` (decimal) - Valor em euros do desconto mensal
  - `duracao_meses_desconto` (integer) - Número de meses que o desconto é aplicado
  - `descricao_desconto_temporario` (text) - Descrição opcional do desconto (ex: "Campanha de Primavera")

  ## Exemplos de Uso
  - Desconto de 10€/mês durante 6 meses
  - Desconto de 15€/mês durante 12 meses (primeiro ano)
  - Desconto de 5€/mês durante 3 meses (campanha de boas-vindas)

  ## Notas
  - Se `desconto_mensal_temporario` for 0 ou NULL, não há desconto temporário
  - Se `duracao_meses_desconto` for 0 ou NULL, o desconto temporário não é aplicado
  - A descrição é opcional e serve para identificar a campanha
  - Os descontos temporários são aplicados ADICIONALMENTE aos descontos percentuais
*/

-- Adicionar coluna para valor do desconto mensal em euros
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'configuracoes_descontos' AND column_name = 'desconto_mensal_temporario'
  ) THEN
    ALTER TABLE configuracoes_descontos 
    ADD COLUMN desconto_mensal_temporario decimal(10, 2) DEFAULT 0;
  END IF;
END $$;

-- Adicionar coluna para duração em meses
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'configuracoes_descontos' AND column_name = 'duracao_meses_desconto'
  ) THEN
    ALTER TABLE configuracoes_descontos 
    ADD COLUMN duracao_meses_desconto integer DEFAULT 0;
  END IF;
END $$;

-- Adicionar coluna para descrição do desconto temporário
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'configuracoes_descontos' AND column_name = 'descricao_desconto_temporario'
  ) THEN
    ALTER TABLE configuracoes_descontos 
    ADD COLUMN descricao_desconto_temporario text;
  END IF;
END $$;

-- Adicionar comentários para documentação
COMMENT ON COLUMN configuracoes_descontos.desconto_mensal_temporario IS 
  'Valor em euros do desconto mensal aplicado durante um período promocional';

COMMENT ON COLUMN configuracoes_descontos.duracao_meses_desconto IS 
  'Número de meses durante os quais o desconto temporário é aplicado';

COMMENT ON COLUMN configuracoes_descontos.descricao_desconto_temporario IS 
  'Descrição opcional da campanha promocional (ex: "Campanha de Verão 2026")';

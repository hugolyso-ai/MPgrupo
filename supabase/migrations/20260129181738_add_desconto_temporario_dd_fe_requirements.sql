/*
  # Adicionar Requisitos de DD/FE para Descontos Temporários

  ## Descrição
  Esta migração adiciona campos para configurar se um desconto temporário requer
  Débito Direto (DD) e/ou Fatura Eletrónica (FE) para ser aplicado.

  ## Mudanças

  ### Novas Colunas em `configuracoes_descontos`:
  - `desconto_temp_requer_dd` (boolean) - Indica se o desconto temporário requer Débito Direto
  - `desconto_temp_requer_fe` (boolean) - Indica se o desconto temporário requer Fatura Eletrónica

  ## Exemplos de Uso
  - desconto_temp_requer_dd = false, desconto_temp_requer_fe = false: Desconto disponível para todos
  - desconto_temp_requer_dd = true, desconto_temp_requer_fe = false: Desconto apenas com DD
  - desconto_temp_requer_dd = false, desconto_temp_requer_fe = true: Desconto apenas com FE
  - desconto_temp_requer_dd = true, desconto_temp_requer_fe = true: Desconto apenas com DD + FE

  ## Notas
  - Por padrão, ambos são false (não requer nenhuma condição)
  - O desconto só é aplicado se as condições forem atendidas
  - Se o cliente não atende às condições, é mostrado um alerta na simulação
*/

-- Adicionar coluna para requisito de Débito Direto
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'configuracoes_descontos' AND column_name = 'desconto_temp_requer_dd'
  ) THEN
    ALTER TABLE configuracoes_descontos 
    ADD COLUMN desconto_temp_requer_dd boolean DEFAULT false;
  END IF;
END $$;

-- Adicionar coluna para requisito de Fatura Eletrónica
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'configuracoes_descontos' AND column_name = 'desconto_temp_requer_fe'
  ) THEN
    ALTER TABLE configuracoes_descontos 
    ADD COLUMN desconto_temp_requer_fe boolean DEFAULT false;
  END IF;
END $$;

-- Adicionar comentários para documentação
COMMENT ON COLUMN configuracoes_descontos.desconto_temp_requer_dd IS 
  'Indica se o desconto temporário requer Débito Direto ativado';

COMMENT ON COLUMN configuracoes_descontos.desconto_temp_requer_fe IS 
  'Indica se o desconto temporário requer Fatura Eletrónica ativada';

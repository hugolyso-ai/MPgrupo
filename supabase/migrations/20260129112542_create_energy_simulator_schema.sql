/*
  # Schema para Simulador de Poupança Energética

  1. Novas Tabelas
    - `operadoras`
      - `id` (uuid, primary key)
      - `nome` (text, nome da operadora)
      - `logotipo_url` (text, URL do logotipo)
      - `valor_kwh_simples` (decimal, preço kWh simples)
      - `valor_kwh_vazio` (decimal, preço kWh vazio)
      - `valor_kwh_fora_vazio` (decimal, preço kWh fora de vazio)
      - `valor_kwh_ponta` (decimal, preço kWh ponta)
      - `valor_kwh_cheias` (decimal, preço kWh cheias)
      - `valor_diario_potencias` (jsonb, objeto com valores diários por potência {1.15: valor, 2.3: valor, ...})
      - `ativa` (boolean, se está ativa)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `configuracoes_descontos`
      - `id` (uuid, primary key)
      - `operadora_id` (uuid, foreign key)
      - `desconto_dd_potencia` (decimal, % desconto débito direto no termo potência)
      - `desconto_dd_energia` (decimal, % desconto débito direto no termo energia)
      - `desconto_fe_potencia` (decimal, % desconto fatura eletrónica no termo potência)
      - `desconto_fe_energia` (decimal, % desconto fatura eletrónica no termo energia)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Apenas utilizadores autenticados podem ler operadoras
    - Apenas admin (hugo.martins@mpgrupo.pt) pode modificar dados
*/

-- Criar tabela de operadoras
CREATE TABLE IF NOT EXISTS operadoras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  logotipo_url text,
  valor_kwh_simples decimal(10, 6) DEFAULT 0,
  valor_kwh_vazio decimal(10, 6) DEFAULT 0,
  valor_kwh_fora_vazio decimal(10, 6) DEFAULT 0,
  valor_kwh_ponta decimal(10, 6) DEFAULT 0,
  valor_kwh_cheias decimal(10, 6) DEFAULT 0,
  valor_diario_potencias jsonb DEFAULT '{}',
  ativa boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de configurações de descontos
CREATE TABLE IF NOT EXISTS configuracoes_descontos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operadora_id uuid REFERENCES operadoras(id) ON DELETE CASCADE,
  desconto_dd_potencia decimal(5, 2) DEFAULT 0,
  desconto_dd_energia decimal(5, 2) DEFAULT 0,
  desconto_fe_potencia decimal(5, 2) DEFAULT 0,
  desconto_fe_energia decimal(5, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(operadora_id)
);

-- Habilitar RLS
ALTER TABLE operadoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes_descontos ENABLE ROW LEVEL SECURITY;

-- Políticas para operadoras
CREATE POLICY "Qualquer utilizador autenticado pode visualizar operadoras"
  ON operadoras FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admin pode inserir operadoras"
  ON operadoras FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

CREATE POLICY "Apenas admin pode atualizar operadoras"
  ON operadoras FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt')
  WITH CHECK (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

CREATE POLICY "Apenas admin pode eliminar operadoras"
  ON operadoras FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

-- Políticas para configurações de descontos
CREATE POLICY "Qualquer utilizador autenticado pode visualizar configurações"
  ON configuracoes_descontos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admin pode inserir configurações"
  ON configuracoes_descontos FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

CREATE POLICY "Apenas admin pode atualizar configurações"
  ON configuracoes_descontos FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt')
  WITH CHECK (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

CREATE POLICY "Apenas admin pode eliminar configurações"
  ON configuracoes_descontos FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'hugo.martins@mpgrupo.pt');

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_operadoras_ativa ON operadoras(ativa);
CREATE INDEX IF NOT EXISTS idx_configuracoes_operadora ON configuracoes_descontos(operadora_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_operadoras_updated_at
  BEFORE UPDATE ON operadoras
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracoes_descontos_updated_at
  BEFORE UPDATE ON configuracoes_descontos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
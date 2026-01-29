-- Dados de Exemplo para Popular a Base de Dados
-- Execute este script no SQL Editor do Supabase Dashboard para adicionar dados de teste

-- NOTA: Este script adiciona dados de exemplo.
-- Ajuste os valores conforme necessário para produção.

-- Inserir Operadoras de Exemplo
INSERT INTO operadoras (nome, logotipo_url, valor_kwh_simples, valor_kwh_vazio, valor_kwh_fora_vazio, valor_kwh_ponta, valor_kwh_cheias, valor_diario_potencias, ativa) VALUES
(
  'EDP Comercial',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/EDP_logo.svg/320px-EDP_logo.svg.png',
  0.180000,
  0.120000,
  0.200000,
  0.250000,
  0.210000,
  '{
    "1.15": 0.15,
    "2.3": 0.30,
    "3.45": 0.45,
    "4.6": 0.60,
    "5.75": 0.75,
    "6.9": 0.90,
    "10.35": 1.35,
    "13.8": 1.80,
    "17.25": 2.25,
    "20.7": 2.70,
    "27.6": 3.60,
    "34.5": 4.50,
    "41.4": 5.40
  }',
  true
),
(
  'Endesa',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Endesa_logo.svg/320px-Endesa_logo.svg.png',
  0.175000,
  0.115000,
  0.195000,
  0.245000,
  0.205000,
  '{
    "1.15": 0.14,
    "2.3": 0.28,
    "3.45": 0.42,
    "4.6": 0.56,
    "5.75": 0.70,
    "6.9": 0.84,
    "10.35": 1.26,
    "13.8": 1.68,
    "17.25": 2.10,
    "20.7": 2.52,
    "27.6": 3.36,
    "34.5": 4.20,
    "41.4": 5.04
  }',
  true
),
(
  'Galp',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Galp_Energia_logo.svg/320px-Galp_Energia_logo.svg.png',
  0.182000,
  0.122000,
  0.202000,
  0.252000,
  0.212000,
  '{
    "1.15": 0.16,
    "2.3": 0.32,
    "3.45": 0.48,
    "4.6": 0.64,
    "5.75": 0.80,
    "6.9": 0.96,
    "10.35": 1.44,
    "13.8": 1.92,
    "17.25": 2.40,
    "20.7": 2.88,
    "27.6": 3.84,
    "34.5": 4.80,
    "41.4": 5.76
  }',
  true
),
(
  'Goldenergy',
  'https://www.goldenergy.pt/assets/images/logo-goldenergy.svg',
  0.170000,
  0.110000,
  0.190000,
  0.240000,
  0.200000,
  '{
    "1.15": 0.13,
    "2.3": 0.26,
    "3.45": 0.39,
    "4.6": 0.52,
    "5.75": 0.65,
    "6.9": 0.78,
    "10.35": 1.17,
    "13.8": 1.56,
    "17.25": 1.95,
    "20.7": 2.34,
    "27.6": 3.12,
    "34.5": 3.90,
    "41.4": 4.68
  }',
  true
);

-- Inserir Configurações de Descontos para cada operadora
-- NOTA: Substituir os IDs das operadoras pelos IDs reais após a inserção

-- Para EDP Comercial
INSERT INTO configuracoes_descontos (operadora_id, desconto_dd_potencia, desconto_dd_energia, desconto_fe_potencia, desconto_fe_energia)
SELECT id, 2.00, 1.50, 1.00, 0.50
FROM operadoras
WHERE nome = 'EDP Comercial';

-- Para Endesa
INSERT INTO configuracoes_descontos (operadora_id, desconto_dd_potencia, desconto_dd_energia, desconto_fe_potencia, desconto_fe_energia)
SELECT id, 2.50, 2.00, 1.50, 1.00
FROM operadoras
WHERE nome = 'Endesa';

-- Para Galp
INSERT INTO configuracoes_descontos (operadora_id, desconto_dd_potencia, desconto_dd_energia, desconto_fe_potencia, desconto_fe_energia)
SELECT id, 1.80, 1.30, 0.80, 0.40
FROM operadoras
WHERE nome = 'Galp';

-- Para Goldenergy
INSERT INTO configuracoes_descontos (operadora_id, desconto_dd_potencia, desconto_dd_energia, desconto_fe_potencia, desconto_fe_energia)
SELECT id, 3.00, 2.50, 1.50, 1.00
FROM operadoras
WHERE nome = 'Goldenergy';

-- Verificar dados inseridos
SELECT
  o.nome,
  o.valor_kwh_simples,
  o.ativa,
  cd.desconto_dd_potencia,
  cd.desconto_dd_energia,
  cd.desconto_fe_potencia,
  cd.desconto_fe_energia
FROM operadoras o
LEFT JOIN configuracoes_descontos cd ON o.id = cd.operadora_id
ORDER BY o.nome;

-- NOTAS:
-- 1. Os valores das tarifas são exemplos. Ajuste conforme tarifas reais do mercado.
-- 2. Os URLs dos logotipos são exemplos de URLs públicas. Substitua por URLs reais hospedadas.
-- 3. Os descontos são percentagens (ex: 2.00 = 2%).
-- 4. Os valores diários de potência são calculados com base em estimativas médias.

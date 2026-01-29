/*
  # Add attachment field to pedidos_contacto

  1. Changes
    - Add `anexo_nome` column to store the filename of uploaded attachments
    - Add `anexo_url` column for future storage of attachment URLs (optional)

  2. Notes
    - The actual file content is sent via email as base64
    - We only store the filename for reference in the database
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pedidos_contacto' AND column_name = 'anexo_nome'
  ) THEN
    ALTER TABLE pedidos_contacto ADD COLUMN anexo_nome text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'pedidos_contacto' AND column_name = 'anexo_url'
  ) THEN
    ALTER TABLE pedidos_contacto ADD COLUMN anexo_url text;
  END IF;
END $$;

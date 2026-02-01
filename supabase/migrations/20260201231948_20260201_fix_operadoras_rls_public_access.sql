/*
  # Fix operadoras RLS policies for public access

  1. Issue
    - The operadoras table only allows authenticated users to read data
    - This prevents unauthenticated users from accessing operadoras for the public energy simulator
    - Users lose access when their session expires or on different devices

  2. Changes
    - Add RLS policy to allow anonymous users to read active operadoras
    - Keep existing authenticated policies intact
    - Restrict anonymous access to only active operadoras (ativa = true)

  3. Security
    - Unauthenticated users can only view active operadoras
    - Authenticated admin (hugo.martins@mpgrupo.pt) can still insert/update/delete
    - Data remains protected through RLS
*/

CREATE POLICY "Utilizadores anónimos podem visualizar operadoras ativas"
  ON operadoras FOR SELECT
  TO anon
  USING (ativa = true);

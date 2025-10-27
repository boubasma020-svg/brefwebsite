/*
  # Update RLS policies to allow public access

  This allows the brief form to work without requiring authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can view briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can update briefs" ON briefs;
DROP POLICY IF EXISTS "Anyone can delete briefs" ON briefs;

-- Create new public policies
CREATE POLICY "Public can create briefs"
  ON briefs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can view briefs"
  ON briefs FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can update briefs"
  ON briefs FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete briefs"
  ON briefs FOR DELETE
  TO anon
  USING (true);

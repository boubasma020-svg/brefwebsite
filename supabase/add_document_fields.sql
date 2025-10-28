-- ============================================
-- Add document upload fields for sections 5 and 6
-- Run this SQL in Supabase SQL Editor
-- ============================================

DO $$
BEGIN
  -- Section 5: Identité visuelle - Identity text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'visual_identity_text'
  ) THEN
    ALTER TABLE briefs ADD COLUMN visual_identity_text text;
  END IF;

  -- Section 5: Identité visuelle - Document upload URL
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'visual_identity_document_url'
  ) THEN
    ALTER TABLE briefs ADD COLUMN visual_identity_document_url text;
  END IF;

  -- Section 6: Contenus - Content text field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_text'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_text text;
  END IF;

  -- Section 6: Contenus - Document upload URL
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'briefs' AND column_name = 'content_document_url'
  ) THEN
    ALTER TABLE briefs ADD COLUMN content_document_url text;
  END IF;

END $$;

-- Verify the new columns exist
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'briefs'
AND column_name IN ('visual_identity_text', 'visual_identity_document_url', 'content_text', 'content_document_url')
ORDER BY column_name;

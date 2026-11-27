-- Section 4 (conversation tables) of 008_rls_audit.sql, applied alone 2026-11-27:
-- 008 as a whole was never applied; its role-log trigger duplicates 013 (applied).
-- ─── 4. CONVERSATION TABLES ──────────────────────────────────────────────────
-- Used by P1: Persist conversation history to Supabase.

CREATE TABLE IF NOT EXISTS public.conversations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title      TEXT,              -- auto-generated from first message
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS set_conversations_updated_at ON public.conversations;
CREATE TRIGGER set_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.conversation_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  role            TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for fast conversation lookups
CREATE INDEX IF NOT EXISTS idx_conversations_user_id
  ON public.conversations(user_id, updated_at DESC);

CREATE INDEX IF NOT EXISTS idx_conv_messages_conversation_id
  ON public.conversation_messages(conversation_id, created_at ASC);

-- RLS for conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conversations_select_own"
  ON public.conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "conversations_insert_own"
  ON public.conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "conversations_update_own"
  ON public.conversations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "conversations_delete_own"
  ON public.conversations FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "conversations_service_all"
  ON public.conversations FOR ALL
  USING (auth.role() = 'service_role');

-- RLS for conversation messages
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "conv_messages_select_own"
  ON public.conversation_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "conv_messages_insert_own"
  ON public.conversation_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id AND c.user_id = auth.uid()
    )
  );

CREATE POLICY "conv_messages_service_all"
  ON public.conversation_messages FOR ALL
  USING (auth.role() = 'service_role');

notify pgrst, 'reload schema';

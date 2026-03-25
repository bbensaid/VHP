-- ============================================================
-- MIGRATION 008: RLS Audit, Fixes, and Role Change Audit Log
--
-- Issues fixed:
--   1. rag_documents had no RLS enabled despite the comment in 006.
--   2. state_time_series_auth_read incorrectly allowed 'anon' role.
--   3. profiles missing INSERT policy (needed for edge-case direct inserts).
--   4. conversations / conversation_messages tables added with full RLS
--      (used by P1: Persist Conversations to Supabase).
--   5. role_change_log audit table added (P2: Role Change Audit Log).
-- ============================================================

-- ─── 1. RAG DOCUMENTS RLS ────────────────────────────────────────────────────
-- Previously unprotected. Service role (backend) writes; authenticated users
-- cannot read directly (all reads go through the Python backend JWT-gated API).

ALTER TABLE public.rag_documents ENABLE ROW LEVEL SECURITY;

-- Backend service role has full access
CREATE POLICY "rag_documents_service_all"
  ON public.rag_documents FOR ALL
  USING (auth.role() = 'service_role');

-- Admins can inspect the RAG index
CREATE POLICY "rag_documents_admin_read"
  ON public.rag_documents FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- ─── 2. FIX state_time_series POLICY (remove anon access) ────────────────────
DROP POLICY IF EXISTS "state_time_series_auth_read" ON public.state_time_series;

CREATE POLICY "state_time_series_auth_read"
  ON public.state_time_series FOR SELECT
  USING (auth.role() = 'authenticated');

-- ─── 3. PROFILES INSERT POLICY ───────────────────────────────────────────────
-- The handle_new_user() trigger creates profiles automatically, but allow
-- direct insert for edge cases (e.g. SSO providers with custom claims).
CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

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

-- ─── 5. ROLE CHANGE AUDIT LOG ────────────────────────────────────────────────
-- Immutable log of every role grant/revoke for compliance (P2: Audit Log).

CREATE TABLE IF NOT EXISTS public.role_change_log (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id),
  old_role    TEXT,                            -- NULL = newly granted
  new_role    TEXT        NOT NULL,
  changed_by  UUID        REFERENCES auth.users(id),
  changed_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  reason      TEXT
);

CREATE INDEX IF NOT EXISTS idx_role_change_log_user
  ON public.role_change_log(user_id, changed_at DESC);

ALTER TABLE public.role_change_log ENABLE ROW LEVEL SECURITY;

-- Users can see their own history; admins can see all
CREATE POLICY "role_log_select_own"
  ON public.role_change_log FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Only service role or admins can insert log entries
CREATE POLICY "role_log_insert_service"
  ON public.role_change_log FOR INSERT
  WITH CHECK (
    auth.role() = 'service_role'
    OR public.has_role(auth.uid(), 'admin')
  );

-- No updates or deletes — audit log is append-only
-- (Enforced by only granting INSERT, not UPDATE/DELETE)

-- ─── 6. TRIGGER: auto-log role changes ───────────────────────────────────────
CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.role_change_log (user_id, old_role, new_role, changed_by)
    VALUES (NEW.user_id, NULL, NEW.role::TEXT, auth.uid());
  ELSIF TG_OP = 'UPDATE' AND OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_change_log (user_id, old_role, new_role, changed_by)
    VALUES (NEW.user_id, OLD.role::TEXT, NEW.role::TEXT, auth.uid());
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.role_change_log (user_id, old_role, new_role, changed_by)
    VALUES (OLD.user_id, OLD.role::TEXT, 'revoked', auth.uid());
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$;

DROP TRIGGER IF EXISTS user_roles_audit_trigger ON public.user_roles;
CREATE TRIGGER user_roles_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_role_change();

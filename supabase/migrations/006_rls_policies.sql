-- ============================================================
-- MIGRATION 006: Row Level Security Policies
-- Must run AFTER all table-creation migrations
-- ============================================================

-- ─── ENABLE RLS ON ALL TABLES ────────────────────────────────────────────────
ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_customers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_events         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_health_metrics  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_time_series     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rht_state_profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_tracks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_initiatives     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.national_benchmark    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_clients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_reports      ENABLE ROW LEVEL SECURITY;
-- rag_documents RLS is in 005_rag_vectors.sql (requires pgvector extension)

-- ─── PROFILES ────────────────────────────────────────────────────────────────
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ─── USER ROLES ──────────────────────────────────────────────────────────────
CREATE POLICY "user_roles_select_own"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_roles_admin_all"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Service role (used by Stripe webhook) can write subscriptions
CREATE POLICY "subscriptions_service_all"
  ON public.subscriptions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "subscriptions_admin_all"
  ON public.subscriptions FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- ─── STRIPE ──────────────────────────────────────────────────────────────────
CREATE POLICY "stripe_customers_select_own"
  ON public.stripe_customers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "stripe_customers_service_all"
  ON public.stripe_customers FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "stripe_events_service_all"
  ON public.stripe_events FOR ALL
  USING (auth.role() = 'service_role');

-- ─── PUBLIC / READ-ONLY CONTENT TABLES ───────────────────────────────────────
-- State health metrics: public read (drives maps & dashboards on public pages)
CREATE POLICY "state_metrics_public_read"
  ON public.state_health_metrics FOR SELECT
  USING (TRUE);

CREATE POLICY "state_metrics_service_write"
  ON public.state_health_metrics FOR ALL
  USING (auth.role() = 'service_role');

-- State time series: authenticated read only
CREATE POLICY "state_time_series_auth_read"
  ON public.state_time_series FOR SELECT
  USING (auth.role() IN ('authenticated', 'anon'));

CREATE POLICY "state_time_series_service_write"
  ON public.state_time_series FOR ALL
  USING (auth.role() = 'service_role');

-- RHT profiles: public read
CREATE POLICY "rht_profiles_public_read"
  ON public.rht_state_profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "rht_profiles_service_write"
  ON public.rht_state_profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Hospitals: public read
CREATE POLICY "hospitals_public_read"
  ON public.hospitals FOR SELECT
  USING (TRUE);

CREATE POLICY "hospitals_service_write"
  ON public.hospitals FOR ALL
  USING (auth.role() = 'service_role');

-- Learning tracks: public read
CREATE POLICY "learning_tracks_public_read"
  ON public.learning_tracks FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "learning_tracks_admin_all"
  ON public.learning_tracks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- State initiatives: public read
CREATE POLICY "state_initiatives_public_read"
  ON public.state_initiatives FOR SELECT
  USING (TRUE);

CREATE POLICY "state_initiatives_service_write"
  ON public.state_initiatives FOR ALL
  USING (auth.role() = 'service_role');

-- National benchmark: public read
CREATE POLICY "national_benchmark_public_read"
  ON public.national_benchmark FOR SELECT
  USING (TRUE);

CREATE POLICY "national_benchmark_service_write"
  ON public.national_benchmark FOR ALL
  USING (auth.role() = 'service_role');

-- ─── ACADEMY ─────────────────────────────────────────────────────────────────
CREATE POLICY "enrollments_select_own"
  ON public.course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "enrollments_insert_own"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "enrollments_update_own"
  ON public.course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "enrollments_admin_all"
  ON public.course_enrollments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "module_progress_own"
  ON public.module_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "certifications_select_own"
  ON public.certifications FOR SELECT
  USING (auth.uid() = user_id);

-- Anyone can verify a cert by its hash (public /verify/[hash] page)
CREATE POLICY "certifications_verify_by_hash"
  ON public.certifications FOR SELECT
  USING (verification_hash IS NOT NULL);

CREATE POLICY "certifications_service_all"
  ON public.certifications FOR ALL
  USING (auth.role() = 'service_role');

-- ─── ADVISORY ────────────────────────────────────────────────────────────────
CREATE POLICY "advisory_clients_select_own"
  ON public.advisory_clients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "advisory_clients_admin_all"
  ON public.advisory_clients FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Advisory reports: public OR advisory-role users can see all advisory reports
CREATE POLICY "advisory_reports_select"
  ON public.advisory_reports FOR SELECT
  USING (
    is_public = TRUE
    OR public.has_role(auth.uid(), 'advisory')
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "advisory_reports_admin_all"
  ON public.advisory_reports FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- rag_documents policies are in 005_rag_vectors.sql (requires pgvector extension)

// lib/course-api.ts
// Course data layer — Supabase client (db = anon, dbAdmin = service-role)
import { db, dbAdmin } from "@/lib/db/client";
import type {
  Course,
  Track,
  Lesson,
  Enrollment,
  LessonProgress,
  QuizAttempt,
  CourseWithProgress,
  LessonWithProgress,
  TrackWithProgress,
  QuizQuestion,
  QuizOption,
} from "@/types/course";

// ── helpers ──────────────────────────────────────────────────────────────────

function toLesson(row: Record<string, unknown>): Lesson {
  return {
    id: row.id as string,
    trackId: row.track_id as string,
    pillar: row.pillar as Lesson["pillar"],
    order: row.order as number,
    slug: row.slug as string,
    title: row.title as string,
    summary: (row.summary as string) ?? "",
    estimatedMinutes: (row.estimated_minutes as number) ?? 10,
    objectives: (row.objectives as Lesson["objectives"]) ?? [],
    contentBlocks: (row.content_blocks as Lesson["contentBlocks"]) ?? [],
    tags: (row.tags as string[]) ?? [],
    relatedLessonIds: (row.related_lesson_ids as string[]) ?? [],
    isPublished: row.is_published as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function toTrack(row: Record<string, unknown>, lessons: Lesson[]): Track {
  return {
    id: row.id as string,
    courseId: row.course_id as string,
    pillar: row.pillar as Track["pillar"],
    order: row.order as number,
    slug: row.slug as string,
    title: row.title as string,
    description: (row.description as string) ?? "",
    icon: (row.icon as string) ?? "",
    targetAudience: (row.target_audience as string[]) ?? [],
    lessons,
    isPublished: row.is_published as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// ── getCourseWithProgress ─────────────────────────────────────────────────────

export async function getCourseWithProgress(
  courseSlug: string,
  userId: string | null
): Promise<CourseWithProgress | null> {
  // 1. Fetch course row
  const { data: courseRow, error: courseErr } = await db
    .from("courses")
    .select("*")
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .single();
  if (courseErr || !courseRow) return null;

  // 2. Fetch tracks
  const { data: trackRows, error: trackErr } = await db
    .from("tracks")
    .select("*")
    .eq("course_id", courseRow.id)
    .eq("is_published", true)
    .order("order");
  if (trackErr || !trackRows) return null;

  const trackIds = trackRows.map((t: Record<string, unknown>) => t.id as string);

  // 3. Fetch lessons for all tracks
  const { data: lessonRows, error: lessonErr } = await db
    .from("lessons")
    .select("*")
    .in("track_id", trackIds)
    .eq("is_published", true)
    .order("order");
  if (lessonErr) return null;

  // 4. Fetch quizzes + questions + options for those lessons
  const lessonIds = (lessonRows ?? []).map((l: Record<string, unknown>) => l.id as string);

  const quizByLesson: Record<string, Record<string, unknown>> = {};
  const questionsByQuiz: Record<string, Record<string, unknown>[]> = {};
  const optionsByQuestion: Record<string, Record<string, unknown>[]> = {};

  if (lessonIds.length > 0) {
    const { data: quizRows } = await db.from("quizzes").select("*").in("lesson_id", lessonIds);
    const quizIds = (quizRows ?? []).map((q: Record<string, unknown>) => q.id as string);

    for (const q of quizRows ?? []) {
      quizByLesson[(q as Record<string, unknown>).lesson_id as string] = q as Record<string, unknown>;
    }

    if (quizIds.length > 0) {
      const { data: questionRows } = await db.from("quiz_questions").select("*").in("quiz_id", quizIds).order("order");
      const questionIds = (questionRows ?? []).map((q: Record<string, unknown>) => q.id as string);

      for (const q of questionRows ?? []) {
        const row = q as Record<string, unknown>;
        (questionsByQuiz[row.quiz_id as string] ??= []).push(row);
      }

      if (questionIds.length > 0) {
        const { data: optionRows } = await db.from("quiz_options").select("*").in("question_id", questionIds).order("order");
        for (const o of optionRows ?? []) {
          const row = o as Record<string, unknown>;
          (optionsByQuestion[row.question_id as string] ??= []).push(row);
        }
      }
    }
  }

  // 5. Fetch enrollment + lesson progress if user is logged in
  let enrollment: Enrollment | undefined;

  if (userId) {
    const { data: enrollRow } = await dbAdmin
      .from("course_player_enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseRow.id)
      .single();

    if (enrollRow) {
      const { data: progressRows } = await dbAdmin
        .from("course_lesson_progress")
        .select("*")
        .eq("enrollment_id", enrollRow.id);

      const { data: attemptRows } = lessonIds.length > 0
        ? await dbAdmin.from("course_quiz_attempts").select("*").eq("user_id", userId).in("lesson_id", lessonIds)
        : { data: [] };

      // Build per-lesson progress map
      const lessonProgress: Record<string, LessonProgress> = {};
      for (const p of progressRows ?? []) {
        const row = p as Record<string, unknown>;
        const lid = row.lesson_id as string;
        const attempts = (attemptRows ?? [])
          .filter((a: Record<string, unknown>) => a.lesson_id === lid)
          .map((a: Record<string, unknown>) => ({
            id: a.id as string,
            userId: a.user_id as string,
            lessonId: a.lesson_id as string,
            quizId: a.quiz_id as string,
            answers: (a.answers ?? {}) as Record<string, string>,
            score: (a.score ?? 0) as number,
            passed: (a.passed ?? false) as boolean,
            completedAt: a.completed_at as string,
          }));

        lessonProgress[lid] = {
          userId: row.user_id as string,
          lessonId: lid,
          status: row.status as LessonProgress["status"],
          startedAt: row.started_at as string | undefined,
          completedAt: row.completed_at as string | undefined,
          audioUploads: {},
          quizAttempts: attempts,
          bestQuizScore: attempts.length
            ? Math.max(...attempts.map((a) => a.score))
            : undefined,
        };
      }

      // Build per-track progress map
      const trackProgress: Enrollment["trackProgress"] = {};
      for (const tr of trackRows) {
        const tRow = tr as Record<string, unknown>;
        const tid = tRow.id as string;
        const tLessonIds = (lessonRows ?? [])
          .filter((l: Record<string, unknown>) => l.track_id === tid)
          .map((l: Record<string, unknown>) => l.id as string);
        const completed = tLessonIds.filter(
          (lid) => lessonProgress[lid]?.status === "completed"
        );
        trackProgress[tid] = {
          userId,
          trackId: tid,
          completedLessonIds: completed,
          percentComplete:
            tLessonIds.length > 0
              ? (completed.length / tLessonIds.length) * 100
              : 0,
        };
      }

      const er = enrollRow as Record<string, unknown>;
      enrollment = {
        id: er.id as string,
        userId: er.user_id as string,
        courseId: er.course_id as string,
        status: er.status as Enrollment["status"],
        enrolledAt: er.enrolled_at as string,
        completedAt: er.completed_at as string | undefined,
        percentComplete: (er.percent_complete ?? 0) as number,
        currentLessonId: er.current_lesson_id as string | undefined,
        lessonProgress,
        trackProgress,
      };
    }
  }

  // 6. Assemble CourseWithProgress
  const tracks: TrackWithProgress[] = trackRows.map((tr: Record<string, unknown>) => {
    const tid = tr.id as string;
    const lessons: LessonWithProgress[] = (lessonRows ?? [])
      .filter((l: Record<string, unknown>) => l.track_id === tid)
      .map((l: Record<string, unknown>) => {
        const lesson = toLesson(l);
        // Attach quiz if present
        const quizRow = quizByLesson[lesson.id];
        if (quizRow) {
          const questions: QuizQuestion[] = (
            questionsByQuiz[quizRow.id as string] ?? []
          ).map((q) => ({
            id: q.id as string,
            type: q.question_type as QuizQuestion["type"],
            question: q.question as string,
            explanation: q.explanation as string | undefined,
            points: (q.points ?? 1) as number,
            options: (optionsByQuestion[q.id as string] ?? []).map(
              (o): QuizOption => ({
                id: o.id as string,
                text: o.text as string,
                isCorrect: o.is_correct as boolean,
                explanation: o.explanation as string | undefined,
              })
            ),
          }));
          lesson.quiz = {
            id: quizRow.id as string,
            title: quizRow.title as string | undefined,
            passingScore: (quizRow.passing_score ?? 70) as number,
            shuffleOptions: (quizRow.shuffle_options ?? true) as boolean,
            questions,
          };
        }
        return {
          ...lesson,
          progress: enrollment?.lessonProgress[lesson.id],
        };
      });

    return {
      ...toTrack(tr, lessons.map(({ progress: _, ...l }) => l)),
      lessons,
      progress: enrollment?.trackProgress[tid],
    };
  });

  const cr = courseRow as Record<string, unknown>;
  return {
    id: cr.id as string,
    slug: cr.slug as string,
    title: cr.title as string,
    subtitle: (cr.subtitle ?? "") as string,
    description: (cr.description ?? "") as string,
    coverImageUrl: cr.cover_image_url as string | undefined,
    targetAudience: (cr.target_audience ?? []) as string[],
    prerequisites: (cr.prerequisites ?? []) as string[],
    estimatedHours: (cr.estimated_hours ?? 0) as number,
    isPublished: cr.is_published as boolean,
    version: (cr.version ?? "1.0.0") as string,
    createdAt: cr.created_at as string,
    updatedAt: cr.updated_at as string,
    tracks,
    enrollment,
  };
}

// ── enrollUser ────────────────────────────────────────────────────────────────

export async function enrollUser(
  userId: string,
  courseId: string
): Promise<Enrollment> {
  const { data, error } = await dbAdmin
    .from("course_player_enrollments")
    .upsert(
      { user_id: userId, course_id: courseId, status: "not_started" },
      { onConflict: "user_id,course_id" }
    )
    .select()
    .single();
  if (error) throw new Error(`enrollUser: ${error.message}`);
  const row = data as Record<string, unknown>;
  return {
    id: row.id as string,
    userId: row.user_id as string,
    courseId: row.course_id as string,
    status: row.status as Enrollment["status"],
    enrolledAt: row.enrolled_at as string,
    completedAt: row.completed_at as string | undefined,
    percentComplete: (row.percent_complete ?? 0) as number,
    currentLessonId: row.current_lesson_id as string | undefined,
    lessonProgress: {},
    trackProgress: {},
  };
}

// ── updateLessonProgress ──────────────────────────────────────────────────────

export async function updateLessonProgress(
  userId: string,
  lessonId: string,
  enrollmentId: string,
  status: "in_progress" | "completed"
): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await dbAdmin.from("course_lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      enrollment_id: enrollmentId,
      status,
      started_at: now,
      ...(status === "completed" ? { completed_at: now } : {}),
    },
    { onConflict: "user_id,lesson_id" }
  );
  if (error) throw new Error(`updateLessonProgress: ${error.message}`);
}

// ── recordQuizAttempt ─────────────────────────────────────────────────────────

export async function recordQuizAttempt(
  userId: string,
  lessonId: string,
  quizId: string,
  answers: Record<string, string>,
  score: number,
  passed: boolean
): Promise<QuizAttempt> {
  const { data, error } = await dbAdmin
    .from("course_quiz_attempts")
    .insert({
      user_id: userId,
      quiz_id: quizId,
      lesson_id: lessonId,
      answers,
      score,
      passed,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw new Error(`recordQuizAttempt: ${error.message}`);
  const row = data as Record<string, unknown>;
  return {
    id: row.id as string,
    userId: row.user_id as string,
    lessonId: row.lesson_id as string,
    quizId: row.quiz_id as string,
    answers: row.answers as Record<string, string>,
    score: row.score as number,
    passed: row.passed as boolean,
    completedAt: row.completed_at as string,
  };
}

// ── updateAudioSlot ───────────────────────────────────────────────────────────

export async function updateAudioSlot(
  lessonId: string,
  slotKey: string,
  uploadedUrl: string,
  uploadedBy: string
): Promise<void> {
  const { error } = await db
    .from("audio_slots")
    .update({
      uploaded_url: uploadedUrl,
      uploaded_by: uploadedBy,
      uploaded_at: new Date().toISOString(),
    })
    .eq("lesson_id", lessonId)
    .eq("slot_key", slotKey);
  if (error) throw new Error(`updateAudioSlot: ${error.message}`);
}

// ── seedCourseFromJson ────────────────────────────────────────────────────────
// One-time seeder — uses dbAdmin (service-role) to bypass RLS.

export async function seedCourseFromJson(courseData: Course): Promise<void> {
  // 1. Upsert course
  const { data: courseRow, error: courseErr } = await dbAdmin
    .from("courses")
    .upsert(
      {
        id: courseData.id,
        slug: courseData.slug,
        title: courseData.title,
        subtitle: courseData.subtitle,
        description: courseData.description,
        target_audience: courseData.targetAudience,
        prerequisites: courseData.prerequisites,
        estimated_hours: courseData.estimatedHours,
        is_published: courseData.isPublished,
        version: courseData.version,
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();
  if (courseErr) throw new Error(`seed course: ${courseErr.message}`);
  const courseId = (courseRow as Record<string, unknown>).id as string;

  for (const track of courseData.tracks) {
    // 2. Upsert track
    const { data: trackRow, error: trackErr } = await dbAdmin
      .from("tracks")
      .upsert(
        {
          id: track.id,
          course_id: courseId,
          pillar: track.pillar,
          order: track.order,
          slug: track.slug,
          title: track.title,
          description: track.description,
          icon: track.icon,
          target_audience: track.targetAudience,
          is_published: track.isPublished,
        },
        { onConflict: "course_id,slug" }
      )
      .select("id")
      .single();
    if (trackErr) throw new Error(`seed track ${track.slug}: ${trackErr.message}`);
    const trackId = (trackRow as Record<string, unknown>).id as string;

    for (const lesson of track.lessons) {
      // Extract audio_slot blocks before storing content_blocks
      const audioSlots = lesson.contentBlocks.filter(
        (b) => b.type === "audio_slot"
      );

      // 3. Upsert lesson
      const { data: lessonRow, error: lessonErr } = await dbAdmin
        .from("lessons")
        .upsert(
          {
            id: lesson.id,
            track_id: trackId,
            pillar: lesson.pillar,
            order: lesson.order,
            slug: lesson.slug,
            title: lesson.title,
            summary: lesson.summary,
            estimated_minutes: lesson.estimatedMinutes,
            objectives: lesson.objectives,
            content_blocks: lesson.contentBlocks,
            tags: lesson.tags,
            related_lesson_ids: lesson.relatedLessonIds ?? [],
            is_published: lesson.isPublished,
          },
          { onConflict: "track_id,slug" }
        )
        .select("id")
        .single();
      if (lessonErr) throw new Error(`seed lesson ${lesson.slug}: ${lessonErr.message}`);
      const lessonId = (lessonRow as Record<string, unknown>).id as string;

      // 4. Upsert audio_slots
      for (const block of audioSlots) {
        if (block.type !== "audio_slot") continue;
        const slotKey = block.label.toLowerCase().replace(/\s+/g, "_");
        await dbAdmin.from("audio_slots").upsert(
          {
            lesson_id: lessonId,
            slot_key: slotKey,
            label: block.label,
            hint: block.hint,
            uploaded_url: block.uploadedUrl ?? null,
            transcript_url: block.transcriptUrl ?? null,
          },
          { onConflict: "lesson_id,slot_key" }
        );
      }

      // 5. Upsert quiz
      if (lesson.quiz) {
        const quiz = lesson.quiz;
        const { data: quizRow, error: quizErr } = await dbAdmin
          .from("quizzes")
          .upsert(
            {
              id: quiz.id,
              lesson_id: lessonId,
              title: quiz.title ?? null,
              passing_score: quiz.passingScore,
              shuffle_options: quiz.shuffleOptions ?? true,
            },
            { onConflict: "lesson_id" }
          )
          .select("id")
          .single();
        if (quizErr) throw new Error(`seed quiz for ${lesson.slug}: ${quizErr.message}`);
        const quizId = (quizRow as Record<string, unknown>).id as string;

        for (const [qi, question] of quiz.questions.entries()) {
          const { data: qRow, error: qErr } = await dbAdmin
            .from("quiz_questions")
            .upsert(
              {
                id: question.id,
                quiz_id: quizId,
                order: qi + 1,
                question_type: question.type,
                question: question.question,
                explanation: question.explanation ?? null,
                points: question.points,
              },
              { onConflict: "quiz_id,order" }
            )
            .select("id")
            .single();
          if (qErr) throw new Error(`seed question: ${qErr.message}`);
          const questionId = (qRow as Record<string, unknown>).id as string;

          for (const [oi, option] of question.options.entries()) {
            await dbAdmin.from("quiz_options").upsert(
              {
                id: option.id,
                question_id: questionId,
                order: oi + 1,
                text: option.text,
                is_correct: option.isCorrect,
                explanation: option.explanation ?? null,
              },
              { onConflict: "question_id,order" }
            );
          }
        }
      }
    }
  }

  console.log(`✓ Seeded course "${courseData.title}" (${courseData.slug})`);
}

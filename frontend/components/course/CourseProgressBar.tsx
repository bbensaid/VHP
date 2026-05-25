export function CourseProgressBar({
  percent,
  completedLessons,
  totalLessons,
}: {
  percent: number;
  completedLessons: number;
  totalLessons: number;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{Math.round(percent)}% complete</span>
        <span>{completedLessons}/{totalLessons} lessons</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-sky-600 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percent, 100)}%` }}
        />
      </div>
    </div>
  );
}

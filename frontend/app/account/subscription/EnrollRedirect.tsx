"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EnrollRedirect({ from }: { from: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(from);
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, from, router]);

  return (
    <div className="flex items-center justify-between mt-3 gap-3">
      <Link
        href={from}
        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
      >
        Continue to your course →
      </Link>
      <span className="text-xs text-emerald-600">Redirecting in {countdown}s…</span>
    </div>
  );
}

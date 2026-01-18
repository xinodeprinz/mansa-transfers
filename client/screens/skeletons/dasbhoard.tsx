export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="h-6 w-32 rounded-lg bg-slate-200/70 animate-pulse" />
            <div className="mt-2 h-4 w-56 rounded-lg bg-slate-200/60 animate-pulse" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 shadow-sm sm:w-72">
              <div className="flex h-full items-center gap-2">
                <div className="h-4 w-24 rounded bg-slate-200/70 animate-pulse" />
                <div className="h-4 w-4 rounded-full bg-slate-200/70 animate-pulse" />
                <div className="h-4 w-32 rounded bg-slate-200/70 animate-pulse" />
              </div>
            </div>

            <div className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 shadow-sm sm:w-32">
              <div className="flex h-full items-center justify-center gap-2">
                <div className="h-4 w-4 rounded bg-slate-200/70 animate-pulse" />
                <div className="h-4 w-14 rounded bg-slate-200/70 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded bg-slate-200/70 animate-pulse" />
              <div className="h-5 w-28 rounded bg-slate-200/70 animate-pulse" />
              <div className="h-5 w-10 rounded-full bg-slate-100 animate-pulse" />
            </div>

            <div className="h-10 w-full rounded-xl bg-slate-200/70 animate-pulse sm:w-36" />
          </div>

          {/* Products grid skeleton */}
          <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-44 w-full bg-slate-200/70 animate-pulse" />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="h-4 w-40 rounded bg-slate-200/70 animate-pulse" />
                      <div className="mt-2 h-3 w-28 rounded bg-slate-200/60 animate-pulse" />
                    </div>
                    <div className="h-4 w-20 rounded bg-slate-200/70 animate-pulse" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-full rounded bg-slate-200/60 animate-pulse" />
                    <div className="h-3 w-4/5 rounded bg-slate-200/60 animate-pulse" />
                  </div>

                  <div className="mt-4 h-3 w-24 rounded bg-slate-200/60 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import type { ButtonProps } from "@/types";

export default function Button({
  isLoading = false,
  variant = "primary",
  loadingText = "Loading...",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || isLoading);

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={[
        "inline-flex items-center cursor-pointer justify-center",
        "gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
        "shadow-sm transition focus:outline-none focus:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-900 focus:ring-slate-200"
          : "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 focus:ring-slate-100",
        className,
      ].join(" ")}
    >
      {isLoading ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

import { TextInputProps } from "@/types";
import { useId, useMemo, useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export default function TextInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
  helperText,
  rightSlot,
  className,
  type,
  disabled,
  ...props
}: TextInputProps<T>) {
  const id = useId();

  // Only enable toggle when it's a password input
  const isPassword = useMemo(() => type === "password", [type]);
  const [showPassword, setShowPassword] = useState(false);

  const computedType = isPassword ? (showPassword ? "text" : "password") : type;
  const showRightArea = Boolean(rightSlot) || isPassword;

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          {...register(name)}
          {...props}
          type={computedType}
          disabled={disabled}
          aria-invalid={!!error}
          className={[
            "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900",
            "placeholder:text-slate-400",
            "shadow-sm outline-none transition",
            "focus:ring-4",
            showRightArea ? "pr-12" : "",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-slate-300 focus:ring-slate-100",
            "disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed",
            className,
          ].join(" ")}
        />

        {showRightArea ? (
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {/* Password toggle built-in */}
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                disabled={disabled}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={[
                  "inline-flex h-9 w-9 items-center justify-center rounded-lg",
                  "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                  "focus:outline-none focus:ring-4 focus:ring-slate-100",
                  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent",
                ].join(" ")}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            ) : null}

            {/* Optional extra right slot still supported */}
            {rightSlot ? rightSlot : null}
          </div>
        ) : null}
      </div>

      <div className="mt-1.5 min-h-5">
        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
}

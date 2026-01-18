"use client";

import { ImageUploadProps } from "@/types";
import { ImagePlus, Trash2 } from "lucide-react";
import { useEffect, useId, useMemo, useRef } from "react";

export default function ImageUpload({
  label,
  error,
  helperText,
  disabled,
  value,
  onChange,
}: ImageUploadProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasError = Boolean(error);
  const accept = "image/png,image/jpeg,image/webp";

  // ✅ Derive preview URL (no state, no setState in effect)
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  // ✅ Revoke URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openPicker = () => inputRef.current?.click();

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onChange(file);
        }}
      />

      <div
        className={[
          "rounded-2xl border bg-white p-4 shadow-sm",
          "transition focus-within:ring-4",
          hasError
            ? "border-red-300 focus-within:ring-red-100"
            : "border-slate-200 focus-within:ring-slate-100",
          disabled ? "opacity-60" : "",
        ].join(" ")}
      >
        {previewUrl ? (
          <div className="flex items-start gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Selected product"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">
                {value?.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {value?.size ? (value.size / 1024 / 1024).toFixed(2) : "0.00"}{" "}
                MB
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                >
                  <ImagePlus className="h-4 w-4" aria-hidden="true" />
                  Change
                </button>

                <button
                  type="button"
                  onClick={clear}
                  disabled={disabled}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={openPicker}
            disabled={disabled}
            className={[
              "flex w-full items-center justify-between gap-4 rounded-xl border border-dashed p-4 text-left",
              hasError ? "border-red-300" : "border-slate-200",
              "hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100",
            ].join(" ")}
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Upload an image
              </p>
              <p className="mt-1 text-xs text-slate-500">
                PNG, JPG or WEBP. Recommended square image.
              </p>
            </div>

            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <ImagePlus className="h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>

      <div className="mt-1.5 min-h-5">
        {hasError ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
}

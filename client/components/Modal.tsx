"use client";

import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  title,
  description,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40"
      />

      {/* Panel */}
      <div className="relative mx-auto flex min-h-screen max-w-2xl items-center justify-center px-4 py-10">
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {title}
              </h2>
              {description ? (
                <p className="mt-1 text-sm text-slate-600">{description}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Scrollable body */}
          <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-6 py-5 pr-4 thin-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

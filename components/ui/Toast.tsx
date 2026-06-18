"use client";

import { createContext, useContext, useCallback, useState, useEffect } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  exiting?: boolean;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function useToast() {
  const { addToast } = useContext(ToastContext);

  return {
    success: (message: string) => addToast("success", message),
    error: (message: string) => addToast("error", message),
    warning: (message: string) => addToast("warning", message),
    info: (message: string) => addToast("info", message),
  };
}

const TOAST_CONFIG: Record<ToastType, { icon: string; colors: string }> = {
  success: {
    icon: "✅",
    colors:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  error: {
    icon: "❌",
    colors:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
  warning: {
    icon: "⚠️",
    colors:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  info: {
    icon: "ℹ️",
    colors:
      "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
};

function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastMessage;
  onClose: () => void;
}) {
  const config = TOAST_CONFIG[toast.type];

  return (
    <div
      className={`${toast.exiting ? "toast-exit" : "toast-enter"} flex items-start gap-3 min-w-[300px] max-w-[400px] bg-white dark:bg-[#13131a] border ${config.colors} rounded-2xl p-4 shadow-2xl backdrop-blur-xl`}
    >
      <span className="text-base flex-shrink-0 mt-0.5">{config.icon}</span>
      <p className="text-sm font-medium flex-1 leading-relaxed">
        {toast.message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-gray-400 dark:text-slate-500 transition-colors text-xs"
        aria-label="Close toast"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => onClose(toast.id)}
        />
      ))}
    </div>
  );
}

"use client";

import { useState, useCallback, useRef } from "react";
import { ToastContext, ToastContainer } from "./Toast";
import type { ToastMessage, ToastType } from "./Toast";

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    // Start exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );
    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string) => {
      counterRef.current += 1;
      const id = `toast-${counterRef.current}-${Date.now()}`;
      const newToast: ToastMessage = { id, type, message };

      setToasts((prev) => [...prev, newToast]);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

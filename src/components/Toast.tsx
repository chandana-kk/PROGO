"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string };

const Ctx = createContext<{ push: (message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const push = useCallback((message: string) => {
    const id = Date.now();
    setItems((s) => [...s, { id, message }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 3200);
  }, []);
  const value = useMemo(() => ({ push }), [push]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-20 right-4 z-[60] space-y-2 sm:bottom-6">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto rounded-xl bg-navy px-4 py-3 text-sm text-white shadow-lg">
            {t.message}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast");
  return ctx;
}

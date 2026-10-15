import { cn } from "@/lib/utils";

export function SkillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-[#f8fbff] px-2.5 py-1 text-xs font-medium text-navy">
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="progo-card px-6 py-12 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-midnight/40" aria-label="Close" onClick={onClose} />
      <div role="dialog" aria-modal className="relative z-10 w-full max-w-lg progo-card p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-sm text-muted hover:text-navy">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Tabs({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-line bg-white p-1">
      {items.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm",
            value === t.id ? "bg-navy text-white" : "text-muted hover:text-navy",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton h-24 rounded-xl", className)} />;
}

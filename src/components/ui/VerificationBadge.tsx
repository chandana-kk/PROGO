"use client";

import { VERIFICATION_COPY, type VerificationLevel } from "@/lib/verification";
import { cn } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Modal } from "./Misc";

export function VerificationBadge({
  level,
  className,
}: {
  level: VerificationLevel;
  className?: string;
}) {
  const copy = VERIFICATION_COPY[level];
  const [open, setOpen] = useState(false);
  const tone =
    copy.tone === "success"
      ? "bg-[#e8f7f0] text-[#0f8a5f] border-[#b7e4cf]"
      : copy.tone === "info"
        ? "bg-[#eef4ff] text-[#175cd3] border-[#c7d7fe]"
        : "bg-[#f4f6f9] text-muted border-line";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold",
          tone,
          className,
        )}
      >
        {copy.tone === "success" ? <BadgeCheck className="h-3.5 w-3.5" /> : null}
        {copy.label}
      </button>
      <Modal open={open} title={copy.label} onClose={() => setOpen(false)}>
        <p className="text-sm leading-6 text-muted">{copy.explanation}</p>
        <p className="mt-3 text-xs text-muted">
          Level {copy.short}. ProGo does not assign authenticity percentages.
        </p>
      </Modal>
    </>
  );
}

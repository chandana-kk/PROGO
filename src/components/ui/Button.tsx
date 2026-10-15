"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary:
    "bg-electric text-white hover:bg-[#1557d4] shadow-sm",
  secondary:
    "bg-white text-navy border border-line hover:bg-[#f8fafc]",
  ghost: "bg-transparent text-navy hover:bg-white/70",
  danger: "bg-[#b42318] text-white hover:bg-[#912018]",
};

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof styles;
  href?: string;
  children: ReactNode;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:opacity-50",
    styles[variant],
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

import Link from "next/link";
import { getSession } from "@/lib/auth";
import { SiteNavClient } from "./SiteNavClient";

export async function SiteHeader({ variant = "marketing" }: { variant?: "marketing" | "app" }) {
  const session = await getSession();
  return <SiteNavClient variant={variant} session={session} />;
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
        <div className="sm:col-span-1">
          <p className="text-lg font-semibold tracking-tight">PROGO</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your work. Your proof. Your professional identity.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/explore">Explore</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/verification">Verification</Link></li>
            <li><Link href="/companies">Companies</Link></li>
            <li><Link href="/universities">Universities</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Resources</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/jobs">Jobs</Link></li>
            <li><Link href="/about#contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/about#privacy">Privacy</Link></li>
            <li><Link href="/about#terms">Terms</Link></li>
            <li><Link href="/about#security">Security</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">
        © 2026 ProGo. All rights reserved.
      </p>
    </footer>
  );
}

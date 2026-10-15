"use client";

import type { SessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  Bell,
  Compass,
  FolderKanban,
  Home,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/app/actions/auth";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";

export function SiteNavClient({
  variant,
  session,
}: {
  variant: "marketing" | "app";
  session: SessionUser | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  if (variant === "marketing") {
    return (
      <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            PROGO
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <Link href="/explore" className="hover:text-navy">Explore</Link>
            <Link href="/projects" className="hover:text-navy">Projects</Link>
            <Link href="/#how" className="hover:text-navy">How it works</Link>
            <Link href="/companies" className="hover:text-navy">For Companies</Link>
          </nav>
          <div className="flex items-center gap-2">
            {session ? (
              <Button href="/home" className="hidden sm:inline-flex">
                Open workspace
              </Button>
            ) : (
              <>
                <Button href="/login" variant="ghost" className="hidden sm:inline-flex">
                  Log in
                </Button>
                <Button href="/signup">Join ProGo</Button>
              </>
            )}
            <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <div className="space-y-2 border-t border-line px-4 py-3 text-sm md:hidden">
            <Link href="/explore" className="block py-1">Explore</Link>
            <Link href="/projects" className="block py-1">Projects</Link>
            <Link href="/#how" className="block py-1">How it works</Link>
            <Link href="/companies" className="block py-1">For Companies</Link>
            <Link href="/login" className="block py-1">Log in</Link>
          </div>
        ) : null}
      </header>
    );
  }

  const links = [
    { href: "/home", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/projects", label: "Projects" },
    { href: "/network", label: "Network" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/home" className="text-lg font-semibold tracking-tight">
          PROGO
        </Link>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg px-3 py-1.5",
                pathname === l.href ? "bg-canvas text-navy" : "text-muted hover:text-navy",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/search" className="rounded-lg p-2 text-muted hover:bg-canvas" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          <Link href="/notifications" className="rounded-lg p-2 text-muted hover:bg-canvas" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Link>
          <div className="relative">
            <button onClick={() => setMenu((v) => !v)} aria-label="Account menu">
              <Avatar name={session?.fullName ?? "You"} size={32} />
            </button>
            {menu ? (
              <div className="absolute right-0 mt-2 w-48 progo-card py-1 text-sm">
                <Link href="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-canvas">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 hover:bg-canvas">
                  <FolderKanban className="h-4 w-4" /> Dashboard
                </Link>
                <Link href="/settings" className="flex items-center gap-2 px-3 py-2 hover:bg-canvas">
                  <Settings className="h-4 w-4" /> Settings
                </Link>
                {session?.role === "ADMIN" ? (
                  <Link href="/admin" className="block px-3 py-2 hover:bg-canvas">
                    Admin
                  </Link>
                ) : null}
                <form action={logoutAction}>
                  <button className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-canvas">
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const items = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/explore", icon: Compass, label: "Explore" },
    { href: "/projects/create", icon: Plus, label: "Create" },
    { href: "/notifications", icon: Bell, label: "Alerts" },
    { href: "/profile", icon: User, label: "Profile" },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white md:hidden">
      <ul className="grid grid-cols-5">
        {items.map((i) => {
          const Icon = i.icon;
          const active = pathname === i.href;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[11px]",
                  active ? "text-electric" : "text-muted",
                )}
              >
                <Icon className="h-5 w-5" />
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

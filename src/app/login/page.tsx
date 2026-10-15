import { LoginForm } from "@/components/AuthForms";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md progo-card p-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          PROGO
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>
        <p className="mt-1 text-sm text-muted">Continue building your professional identity.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

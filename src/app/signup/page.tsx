import { SignupForm } from "@/components/AuthForms";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Join ProGo" };

export default function SignupPage() {
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-16">
      <div className="w-full max-w-md progo-card p-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          PROGO
        </Link>
        <h1 className="mt-6 text-2xl font-semibold">Join ProGo</h1>
        <p className="mt-1 text-sm text-muted">Show your work. Build your proof.</p>
        <div className="mt-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

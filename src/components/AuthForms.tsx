"use client";

import { loginAction, signupAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Input";
import { ROLES } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Email">
        <Input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
      </Field>
      <Field label="Password">
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      {state?.error ? <p className="text-sm text-[#b42318]">{state.error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Continuing…" : "Continue"}
      </Button>
      <Button type="button" variant="secondary" className="w-full" onClick={() => alert("Google sign-in is planned. Use email for this prototype.")}>
        Continue with Google
      </Button>
      <div className="flex justify-between text-sm text-muted">
        <span>Forgot password? Contact support in this prototype.</span>
        <Link href="/signup" className="text-electric">
          Create account
        </Link>
      </div>
      <p className="rounded-xl bg-canvas p-3 text-xs text-muted">
        Demo: <code>aarav@progo.dev</code> / <code>ProgoDemo1!</code> · Admin: <code>admin@progo.dev</code>
      </p>
    </form>
  );
}

export function SignupForm() {
  const [state, action, pending] = useActionState(signupAction, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Full name">
        <Input name="fullName" required placeholder="Your name" />
      </Field>
      <Field label="Email">
        <Input name="email" type="email" required />
      </Field>
      <Field label="Username">
        <Input name="username" required placeholder="lowercase-handle" />
      </Field>
      <Field label="Password" hint="At least 8 characters.">
        <Input name="password" type="password" required minLength={8} />
      </Field>
      <Field label="Primary role">
        <Select name="role" defaultValue="Developer">
          {ROLES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </Select>
      </Field>
      <Field label="Country">
        <Input name="country" required placeholder="India" />
      </Field>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input type="checkbox" name="terms" className="mt-1" required />
        I agree to ProGo&apos;s Terms and Privacy Policy.
      </label>
      {state?.error ? <p className="text-sm text-[#b42318]">{state.error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating…" : "Create account"}
      </Button>
    </form>
  );
}

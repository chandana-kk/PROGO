"use client";

import { Button } from "./ui/Button";

export function ErrorState({ reset }: { reset?: () => void }) {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong.</h1>
      <p className="mt-2 text-sm text-muted">Please try again.</p>
      {reset ? (
        <Button className="mt-6" onClick={reset}>
          Retry
        </Button>
      ) : (
        <Button href="/" className="mt-6">
          Retry
        </Button>
      )}
    </div>
  );
}

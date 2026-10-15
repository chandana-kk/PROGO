import { LoadingSkeleton } from "@/components/ui/Misc";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">
      <LoadingSkeleton className="h-10 w-64" />
      <LoadingSkeleton className="h-48" />
      <div className="grid gap-4 md:grid-cols-3">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    </div>
  );
}

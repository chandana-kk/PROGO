import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Avatar } from "@/components/ui/Avatar";
import { demoUsers } from "@/lib/demo-data";

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Network</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your network</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demoUsers.map((person) => (
            <div key={person.username} className="progo-card p-4">
              <div className="flex items-center gap-3">
                <Avatar name={person.name} size={42} />
                <div>
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-xs text-muted">{person.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{person.headline}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}

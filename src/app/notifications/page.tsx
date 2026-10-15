import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";

const notifications = [
  { title: "New project published", body: "Rahul published Blueprint Ops and invited your team review.", time: "2h ago" },
  { title: "Verification complete", body: "CampusConnect evidence has been reviewed and marked verified.", time: "1d ago" },
  { title: "New follower", body: "Meera Rao started following your work.", time: "2d ago" },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Notifications</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your updates</h1>
        </div>
        <div className="space-y-4">
          {notifications.map((item) => (
            <article key={item.title} className="progo-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
                </div>
                <span className="text-xs text-muted">{item.time}</span>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}

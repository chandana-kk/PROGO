import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";

export async function AppShell({
  children,
  marketing = false,
}: {
  children: React.ReactNode;
  marketing?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader variant={marketing ? "marketing" : "app"} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 pb-24 md:pb-10">{children}</main>
      {marketing ? null : <MobileNav />}
      <SiteFooter />
    </div>
  );
}

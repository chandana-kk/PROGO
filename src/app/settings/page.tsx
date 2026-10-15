import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Input";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Settings</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Account settings</h1>
        </div>
        <div className="progo-card p-6">
          <div className="space-y-5">
            <Field label="Display name">
              <Input defaultValue="Aarav Sharma" />
            </Field>
            <Field label="Email">
              <Input defaultValue="aarav@progo.dev" type="email" />
            </Field>
            <Field label="Location">
              <Input defaultValue="Bengaluru, India" />
            </Field>
            <div className="flex justify-end gap-3">
              <Button variant="secondary">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}

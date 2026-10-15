import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { MobileNav } from "@/components/SiteNavClient";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Input";

const categories = ["AI & ML", "Data", "Web", "Mobile", "Research", "Design", "Business", "Other"];
const statuses = ["IDEA", "BUILDING", "BETA", "ACTIVE", "COMPLETED"];
const visibilities = ["Public", "Unlisted", "Private"];

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-canvas pb-24 md:pb-12">
      <SiteHeader variant="app" />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-electric">Create</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create a project</h1>
        </div>

        <form className="progo-card p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Project title">
              <Input name="title" placeholder="AI Energy Optimizer" />
            </Field>
            <Field label="Category">
              <Select name="category" defaultValue="AI & ML">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Short description">
                <Input name="description" placeholder="Short description of the work and its impact." />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Detailed description">
                <Textarea name="details" placeholder="Describe the problem you addressed, the solution you built, and why it matters." />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Problem">
                <Textarea name="problem" placeholder="What challenge did this project solve?" />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Solution">
                <Textarea name="solution" placeholder="How did you approach the problem and what did you build?" />
              </Field>
            </div>
            <Field label="Skills">
              <Input name="skills" placeholder="Python, SQL, React" />
            </Field>
            <Field label="Status">
              <Select name="status" defaultValue="BUILDING">
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </Field>
            <Field label="Start date">
              <Input name="startDate" type="date" />
            </Field>
            <Field label="End date">
              <Input name="endDate" type="date" />
            </Field>
            <Field label="Your contribution">
              <Input name="contribution" placeholder="Built data model and optimization engine" />
            </Field>
            <Field label="Team members">
              <Input name="teamMembers" placeholder="Aarav Sharma, Meera Rao" />
            </Field>
            <Field label="Evidence">
              <Input name="evidence" placeholder="GitHub repo, live demo, article" />
            </Field>
            <Field label="Visibility">
              <Select name="visibility" defaultValue="Public">
                {visibilities.map((visibility) => (
                  <option key={visibility} value={visibility}>{visibility}</option>
                ))}
              </Select>
            </Field>
            <div className="md:col-span-2 flex flex-col gap-3 pt-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary">Save draft</Button>
              <Button type="button" variant="secondary">Preview</Button>
              <Button type="submit">Publish project</Button>
            </div>
          </div>
        </form>
      </main>
      <SiteFooter />
      <MobileNav />
    </div>
  );
}

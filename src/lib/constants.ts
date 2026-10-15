export const CATEGORIES = [
  "AI & ML",
  "Web Development",
  "Mobile",
  "Data",
  "Research",
  "Design",
  "Hardware",
  "Business",
  "Other",
] as const;

export const PROJECT_STATUSES = [
  "IDEA",
  "BUILDING",
  "BETA",
  "ACTIVE",
  "COMPLETED",
  "ARCHIVED",
] as const;

export const STATUS_LABEL: Record<string, string> = {
  IDEA: "Idea",
  BUILDING: "Building",
  BETA: "Beta",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

export const VISIBILITY = ["PUBLIC", "UNLISTED", "PRIVATE"] as const;

export const ROLES = [
  "Student",
  "Developer",
  "Designer",
  "Researcher",
  "Entrepreneur",
  "Freelancer",
  "Data professional",
  "Other",
] as const;

export const SKILL_CATALOG = [
  "Python",
  "Machine Learning",
  "SQL",
  "Data Analysis",
  "FastAPI",
  "PostgreSQL",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "UI/UX",
  "Figma",
  "TensorFlow",
  "PyTorch",
  "XGBoost",
  "LSTM",
  "Computer Vision",
  "NLP",
  "Docker",
  "Kubernetes",
  "AWS",
  "Product Strategy",
  "Research Writing",
  "Swift",
  "Kotlin",
] as const;

export const REPORT_REASONS = [
  "Fake project",
  "Fake evidence",
  "Impersonation",
  "Spam",
  "Harassment",
  "Copyright issue",
  "Misleading information",
  "Other",
] as const;

export const EVIDENCE_TYPES = [
  { id: "GITHUB", label: "GitHub Repository" },
  { id: "DEMO", label: "Live Demo" },
  { id: "DOCS", label: "Documentation" },
  { id: "SCREENSHOTS", label: "Screenshots" },
  { id: "VIDEO", label: "Demo Video" },
  { id: "TEAM", label: "Team Confirmation" },
  { id: "OTHER", label: "Other" },
] as const;

export const RESERVED_PROJECT_SLUGS = ["create", "manage"];
export const RESERVED_PROFILE_SLUGS = ["edit"];

import type { VerificationLevel } from "@/lib/verification";

export type DemoUser = {
  username: string;
  name: string;
  headline: string;
  role: string;
  location: string;
  about: string;
  education: string[];
  experience: string[];
  skills: string[];
  followers: number;
  following: number;
  profileViews: number;
  projects: string[];
};

export type DemoContributor = {
  name: string;
  role: string;
  contribution: string;
};

export type DemoProject = {
  slug: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  category: string;
  status: string;
  creator: string;
  creatorUsername: string;
  skills: string[];
  technologies: string[];
  evidence: string[];
  verification: VerificationLevel;
  contributorSummary: string;
  contributors: DemoContributor[];
  coverHue: number;
  startDate: string;
  endDate: string;
};

export const skillCatalog = [
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
  "Data Visualization",
  "Research",
  "Product Design",
  "Systems Design",
  "Go",
];

export const demoUsers: DemoUser[] = [
  {
    username: "aarav-sharma",
    name: "Aarav Sharma",
    headline: "AI/ML Engineer | Building practical AI systems",
    role: "AI/ML Engineer",
    location: "Bengaluru, India",
    about:
      "AI/ML student focused on building practical machine learning and data applications for real-world problems.",
    education: ["B.Tech in Computer Science, VIT Vellore", "Machine Learning Research Track"],
    experience: ["ML Intern, Gradient Labs", "AI Product Fellow, DataForge"],
    skills: ["Python", "Machine Learning", "SQL", "Data Analysis", "FastAPI", "PostgreSQL"],
    followers: 1824,
    following: 248,
    profileViews: 8421,
    projects: ["ai-energy-optimizer", "safe-route"],
  },
  {
    username: "meera-rao",
    name: "Meera Rao",
    headline: "Frontend Developer | Designing trusted product experiences",
    role: "Frontend Developer",
    location: "Hyderabad, India",
    about:
      "Frontend engineer who turns complex systems into usable dashboards, interfaces, and product experiences.",
    education: ["B.Des in Interaction Design, NID Hyderabad"],
    experience: ["Frontend Engineer, Kinetic Labs", "Product Designer, CivicGrid"],
    skills: ["React", "TypeScript", "UI/UX", "Figma", "Node.js", "Data Visualization"],
    followers: 1230,
    following: 180,
    profileViews: 6650,
    projects: ["ai-energy-optimizer", "campus-connect"],
  },
  {
    username: "daniel-kim",
    name: "Daniel Kim",
    headline: "Data professional | Turning uncertainty into decision systems",
    role: "Data Professional",
    location: "Seoul, South Korea",
    about:
      "I build robust analytics products and forecasting systems that help teams act faster with better information.",
    education: ["M.S. in Statistics, KAIST"],
    experience: ["Senior Analyst, Orbit Metrics", "Researcher, OneCloud"],
    skills: ["SQL", "Data Analysis", "Python", "Research", "Product Strategy", "AWS"],
    followers: 540,
    following: 152,
    profileViews: 4230,
    projects: ["fin-sight", "retail-pulse"],
  },
  {
    username: "sofia-patel",
    name: "Sofia Patel",
    headline: "Product strategist | Building sustainable, user-centered systems",
    role: "Product Strategist",
    location: "London, UK",
    about:
      "Translates product signals into roadmaps, experiments, and execution plans that turn technical work into outcomes.",
    education: ["MSc in Innovation, Imperial College London"],
    experience: ["Principal Product Manager, Commons", "Growth Lead, Northstar"],
    skills: ["Product Strategy", "Research", "Systems Design", "Data Analysis", "Figma", "Business"],
    followers: 801,
    following: 205,
    profileViews: 5101,
    projects: ["eco-track", "campus-connect"],
  },
  {
    username: "rahul-verma",
    name: "Rahul Verma",
    headline: "Platform engineer | Shipping resilient infrastructure",
    role: "Developer",
    location: "Pune, India",
    about:
      "I enjoy building resilient platform systems, developer experiences, and internal tooling that scale with teams.",
    education: ["B.E. in Computer Science, COEP"],
    experience: ["Platform Engineer, Scalewave", "Backend Engineer, FrameOps"],
    skills: ["Node.js", "Go", "Docker", "Kubernetes", "AWS", "Systems Design"],
    followers: 1194,
    following: 299,
    profileViews: 6324,
    projects: ["blueprint-ops", "safe-route"],
  },
  {
    username: "anika-nair",
    name: "Anika Nair",
    headline: "Researcher | Human-centered AI and social systems",
    role: "Researcher",
    location: "Berlin, Germany",
    about:
      "Researching trustworthy AI workflows and deployable models in socially useful domains such as mobility and civic access.",
    education: ["PhD in Human-centered AI, TUB Berlin"],
    experience: ["Research Scientist, Civic Labs", "AI Fellow, Open Systems"],
    skills: ["Computer Vision", "NLP", "Research Writing", "Machine Learning", "Python", "TensorFlow"],
    followers: 987,
    following: 150,
    profileViews: 7380,
    projects: ["safe-route", "campus-connect"],
  },
  {
    username: "leo-martins",
    name: "Leo Martins",
    headline: "Designer | Building clarity for complex products",
    role: "Designer",
    location: "São Paulo, Brazil",
    about:
      "Designing product systems for developers and researchers that feel simple, dependable, and useful under pressure.",
    education: ["B.A. in Digital Design, UFMG"],
    experience: ["UX Lead, Redstone", "Product Designer, Circular"],
    skills: ["UI/UX", "Figma", "Research", "Product Design", "Systems Design", "Design Systems"],
    followers: 916,
    following: 143,
    profileViews: 4172,
    projects: ["ai-energy-optimizer", "retail-pulse"],
  },
  {
    username: "priya-iyer",
    name: "Priya Iyer",
    headline: "Data and product engineer | Building evidence-backed decision tools",
    role: "Data Engineer",
    location: "Singapore",
    about:
      "Working at the intersection of product, data, and platform design to create trustworthy infrastructure for high-velocity teams.",
    education: ["B.Eng in Information Systems, NUS"],
    experience: ["Data Engineer, North Grid", "Analytics Engineer, Solace"],
    skills: ["SQL", "Python", "React", "PostgreSQL", "Data Visualization", "AWS"],
    followers: 1128,
    following: 260,
    profileViews: 6012,
    projects: ["fin-sight", "eco-track"],
  },
];

export const demoProjects: DemoProject[] = [
  {
    slug: "ai-energy-optimizer",
    title: "AI Energy Optimizer",
    description: "AI-powered household energy prediction and optimization platform.",
    problem: "Households and small commercial buildings were managing energy use with static schedules and manual interventions, leading to high consumption and uneven peak demand.",
    solution: "Built a forecasting and optimization engine using machine learning models to estimate demand, recommend load-balancing actions, and support automated scheduling.",
    category: "AI & ML",
    status: "COMPLETED",
    creator: "Aarav Sharma",
    creatorUsername: "aarav-sharma",
    skills: ["Python", "Machine Learning", "XGBoost", "LSTM", "FastAPI", "PostgreSQL"],
    technologies: ["Python", "FastAPI", "PostgreSQL", "XGBoost", "LSTM"],
    evidence: ["GitHub Repository", "Documentation", "Live Demo"],
    verification: "EVIDENCE_VERIFIED",
    contributorSummary: "Prediction model and optimization engine.",
    contributors: [
      { name: "Aarav Sharma", role: "ML Engineer", contribution: "Prediction model and optimization engine." },
      { name: "Meera Rao", role: "Frontend Developer", contribution: "Dashboard and user interface." },
    ],
    coverHue: 208,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
  },
  {
    slug: "safe-route",
    title: "SafeRoute",
    description: "Mobility safety intelligence for pedestrians and commuters in dense urban areas.",
    problem: "People navigating busy urban areas lacked dependable, real-time insights into safety hotspots, congestion, and routes with poor visibility.",
    solution: "Combined traffic, incident, and environmental data into a safety-aware routing system that highlighted safer path options and incident risk.",
    category: "AI & ML",
    status: "ACTIVE",
    creator: "Anika Nair",
    creatorUsername: "anika-nair",
    skills: ["Python", "Machine Learning", "Computer Vision", "Research", "NLP"],
    technologies: ["Python", "TensorFlow", "Map data", "Forecasting"],
    evidence: ["GitHub Repository", "Documentation"],
    verification: "CONTRIBUTION_VERIFIED",
    contributorSummary: "Research, modeling, and risk evaluation across commuter routes.",
    contributors: [
      { name: "Anika Nair", role: "Researcher", contribution: "Risk model and public safety experiments." },
      { name: "Rahul Verma", role: "Platform Engineer", contribution: "Data pipeline and route services." },
    ],
    coverHue: 160,
    startDate: "2024-02-01",
    endDate: "2025-01-15",
  },
  {
    slug: "fin-sight",
    title: "FinSight",
    description: "Financial signal dashboard to surface anomalies and opportunities for early-stage teams.",
    problem: "Decision-makers were buried under fragmented metrics and lacked a single view of health, cash flow risk, and operational anomalies.",
    solution: "Designed a revenue and operating intelligence dashboard linking financial and product metrics in one decision layer.",
    category: "Data",
    status: "COMPLETED",
    creator: "Daniel Kim",
    creatorUsername: "daniel-kim",
    skills: ["SQL", "Data Analysis", "Python", "Product Strategy", "AWS"],
    technologies: ["SQL", "Python", "Power BI", "PostgreSQL"],
    evidence: ["GitHub Repository", "Documentation", "Live Demo"],
    verification: "ORGANIZATION_VERIFIED",
    contributorSummary: "Built the data model and financial dashboard used for operational decisions.",
    contributors: [
      { name: "Daniel Kim", role: "Data Professional", contribution: "Forecasting and anomaly detection." },
      { name: "Priya Iyer", role: "Data Engineer", contribution: "Pipeline and reporting layer." },
    ],
    coverHue: 195,
    startDate: "2023-07-15",
    endDate: "2024-02-01",
  },
  {
    slug: "eco-track",
    title: "EcoTrack",
    description: "Community sustainability dashboard for resource monitoring and local impact reporting.",
    problem: "Neighborhood sustainability efforts were hard to measure and even harder to communicate to the public and stakeholders.",
    solution: "Built a modular dashboard to track energy, waste, and water metrics with a clear community-facing story and local action recommendations.",
    category: "Data",
    status: "BETA",
    creator: "Sofia Patel",
    creatorUsername: "sofia-patel",
    skills: ["Product Strategy", "Research", "Data Analysis", "UI/UX", "React"],
    technologies: ["React", "Node.js", "PostgreSQL", "Analytics"],
    evidence: ["Documentation", "Screenshots"],
    verification: "EVIDENCE_SUBMITTED",
    contributorSummary: "Built the product strategy and community reporting layer.",
    contributors: [
      { name: "Sofia Patel", role: "Product Strategist", contribution: "Roadmap and market framing." },
      { name: "Priya Iyer", role: "Data Engineer", contribution: "Impact metrics and dashboards." },
    ],
    coverHue: 128,
    startDate: "2024-04-01",
    endDate: "2024-12-15",
  },
  {
    slug: "campus-connect",
    title: "CampusConnect",
    description: "Student collaboration platform that links clubs, projects, and community opportunities across campus.",
    problem: "Students had difficulty discovering who was building what, where collaboration opportunities existed, and how to contribute meaningfully.",
    solution: "Created a discovery and collaboration system for students to showcase projects, join communities, and connect around shared work.",
    category: "Web",
    status: "ACTIVE",
    creator: "Meera Rao",
    creatorUsername: "meera-rao",
    skills: ["React", "TypeScript", "UI/UX", "Figma", "Next.js", "Product Strategy"],
    technologies: ["Next.js", "React", "Figma", "Node.js"],
    evidence: ["GitHub Repository", "Documentation"],
    verification: "EVIDENCE_VERIFIED",
    contributorSummary: "User experience design and collaboration flows for campus communities.",
    contributors: [
      { name: "Meera Rao", role: "Frontend Developer", contribution: "Dashboard and onboarding experience." },
      { name: "Anika Nair", role: "Researcher", contribution: "Community discovery and testing." },
    ],
    coverHue: 230,
    startDate: "2023-09-01",
    endDate: "2024-07-01",
  },
  {
    slug: "retail-pulse",
    title: "RetailPulse",
    description: "Operational intelligence for retail teams to monitor performance and respond to store conditions quickly.",
    problem: "Store teams lacked a single operating view for sales, staffing, and in-store demand, causing slow responses to changing conditions.",
    solution: "Built a retail operations dashboard combining sales, staffing, and customer flow data into clear decision support for field leaders.",
    category: "Data",
    status: "COMPLETED",
    creator: "Leo Martins",
    creatorUsername: "leo-martins",
    skills: ["Data Analysis", "SQL", "React", "Product Design", "Research"],
    technologies: ["React", "SQL", "Dashboarding", "Analytics"],
    evidence: ["Documentation", "Live Demo"],
    verification: "CONTRIBUTION_VERIFIED",
    contributorSummary: "Created complete dashboarding and operational reporting for store monitoring.",
    contributors: [
      { name: "Leo Martins", role: "Designer", contribution: "Operational dashboard design and prototypes." },
      { name: "Daniel Kim", role: "Data Professional", contribution: "Data model and insights reporting." },
    ],
    coverHue: 260,
    startDate: "2023-11-15",
    endDate: "2024-06-15",
  },
  {
    slug: "blueprint-ops",
    title: "Blueprint Ops",
    description: "Operations dashboard for technical teams to improve release readiness and internal handoff clarity.",
    problem: "Cross-functional engineering teams were losing momentum during releases because operational status existed in fragmented notes and tools.",
    solution: "Built a release orchestration dashboard to unify commitments, blockers, and readiness status across teams.",
    category: "Web",
    status: "BUILDING",
    creator: "Rahul Verma",
    creatorUsername: "rahul-verma",
    skills: ["Node.js", "Next.js", "Go", "Systems Design", "Docker"],
    technologies: ["Next.js", "Docker", "Kubernetes", "Go"],
    evidence: ["GitHub Repository"],
    verification: "EVIDENCE_SUBMITTED",
    contributorSummary: "Built the release operations workflow and internal status layer.",
    contributors: [
      { name: "Rahul Verma", role: "Platform Engineer", contribution: "Engineering operations and release layer." },
      { name: "Sofia Patel", role: "Product Strategist", contribution: "Cross-team planning and operating model." },
    ],
    coverHue: 170,
    startDate: "2024-08-01",
    endDate: "2025-03-01",
  },
  {
    slug: "signal-lab",
    title: "Signal Lab",
    description: "Pipeline and dashboard system for signal monitoring in experimental product teams.",
    problem: "Teams had valuable experiment data but lacked a way to see the product signal and synthesize actionable conclusions quickly.",
    solution: "Built a monitoring layer that surfaces key operational indicators and helps teams discover patterns across experiments.",
    category: "Research",
    status: "IDEA",
    creator: "Priya Iyer",
    creatorUsername: "priya-iyer",
    skills: ["Research", "Python", "Data Analysis", "SQL", "AWS"],
    technologies: ["Python", "PostgreSQL", "Data pipelines"],
    evidence: ["Documentation"],
    verification: "UNVERIFIED",
    contributorSummary: "Initial research framework and experiment signal design.",
    contributors: [
      { name: "Priya Iyer", role: "Data Engineer", contribution: "Signal design and experiment insights." },
    ],
    coverHue: 190,
    startDate: "2025-01-01",
    endDate: "2025-06-01",
  },
  {
    slug: "flux-studio",
    title: "Flux Studio",
    description: "Prototype toolkit for rapid design and engineering validation in early product work.",
    problem: "Teams struggled to move from concept to tested product experience without disconnected prototyping and engineering handoff.",
    solution: "Built a shared experimentation studio to combine design prototypes, validation notes, and early product metrics.",
    category: "Design",
    status: "BUILDING",
    creator: "Leo Martins",
    creatorUsername: "leo-martins",
    skills: ["Figma", "UI/UX", "React", "Research", "Product Design"],
    technologies: ["Figma", "React", "Design systems"],
    evidence: ["Screenshots", "Documentation"],
    verification: "EVIDENCE_SUBMITTED",
    contributorSummary: "Prototype system and validation workflows for product experiments.",
    contributors: [
      { name: "Leo Martins", role: "Designer", contribution: "Studio workflows and interface concepts." },
      { name: "Meera Rao", role: "Frontend Developer", contribution: "Working prototype implementation." },
    ],
    coverHue: 120,
    startDate: "2024-06-01",
    endDate: "2025-01-20",
  },
  {
    slug: "atlas-grid",
    title: "Atlas Grid",
    description: "Infrastructure planning system for teams coordinating complex rollout and dependency tracking.",
    problem: "Cross-team launches became unpredictable when dependencies, risk flags, and ownership were hidden in scattered communication.",
    solution: "Created a shareable operational grid to track dependencies, milestones, and ownership in one place.",
    category: "Business",
    status: "ACTIVE",
    creator: "Sofia Patel",
    creatorUsername: "sofia-patel",
    skills: ["Product Strategy", "Systems Design", "Research", "Business"],
    technologies: ["Notion", "Dashboards", "Workflows"],
    evidence: ["Documentation"],
    verification: "EVIDENCE_SUBMITTED",
    contributorSummary: "Mapped launch readiness and shared operating clarity across stakeholders.",
    contributors: [
      { name: "Sofia Patel", role: "Product Strategist", contribution: "Operating model and launch planning." },
      { name: "Rahul Verma", role: "Platform Engineer", contribution: "Workflow tooling and coordination layer." },
    ],
    coverHue: 90,
    startDate: "2023-12-01",
    endDate: "2024-11-30",
  },
  {
    slug: "nova-radar",
    title: "Nova Radar",
    description: "Signal tracking system for founders and teams assessing market readiness and product direction.",
    problem: "Founders were collecting too many signals without a clear method to evaluate which were actionable and what mattered most for next steps.",
    solution: "Built a compact market intelligence dashboard that organizes signals, competitive observations, and strategy implications.",
    category: "Business",
    status: "BUILDING",
    creator: "Daniel Kim",
    creatorUsername: "daniel-kim",
    skills: ["Data Analysis", "Product Strategy", "Research", "SQL"],
    technologies: ["Python", "Data analysis", "Dashboards"],
    evidence: ["Documentation"],
    verification: "UNVERIFIED",
    contributorSummary: "Combined market intelligence and product signal synthesis.",
    contributors: [
      { name: "Daniel Kim", role: "Data Professional", contribution: "Signal analysis and market review." },
      { name: "Sofia Patel", role: "Product Strategist", contribution: "Strategy synthesis." },
    ],
    coverHue: 320,
    startDate: "2024-10-01",
    endDate: "2025-04-15",
  },
  {
    slug: "orbit-verify",
    title: "Orbit Verify",
    description: "Verification workflow for product claims and evidence in technical portfolios.",
    problem: "Teams and creators had no simple way to separate project claims from verified evidence in public-facing profiles.",
    solution: "Designed a transparent evidence-review experience that clarifies what has been verified and what remains self-reported.",
    category: "Business",
    status: "IDEA",
    creator: "Aarav Sharma",
    creatorUsername: "aarav-sharma",
    skills: ["Product Strategy", "Research", "Python", "Machine Learning"],
    technologies: ["Python", "Security patterns", "Product workflows"],
    evidence: ["Documentation"],
    verification: "UNVERIFIED",
    contributorSummary: "Outline for a transparent verification framework for project evidence.",
    contributors: [
      { name: "Aarav Sharma", role: "AI/ML Engineer", contribution: "Evidence model and trust framework." },
      { name: "Leo Martins", role: "Designer", contribution: "Verification narrative and clarity flows." },
    ],
    coverHue: 50,
    startDate: "2024-11-01",
    endDate: "2025-05-01",
  },
];

export const demoActivities = [
  { label: "Project update", title: "AI Energy Optimizer", detail: "New optimization recommendations shipped for peak load management.", time: "2h ago" },
  { label: "Verification completed", title: "CampusConnect", detail: "Evidence review for the onboarding flow is now verified.", time: "6h ago" },
  { label: "New follower", title: "Aarav Sharma", detail: "Aarav gained 14 new followers this week.", time: "Yesterday" },
  { label: "Contribution confirmation", title: "SafeRoute", detail: "Anika confirmed the research contribution from the mobility model.", time: "Yesterday" },
  { label: "Team invitation", title: "FinSight", detail: "Priya invited you to review the reporting layer and QA notes.", time: "3 days ago" },
  { label: "New project published", title: "Blueprint Ops", detail: "Rahul published the release readiness dashboard for design review.", time: "5 days ago" },
];

export function getPerson(username: string) {
  return demoUsers.find((user) => user.username === username) ?? demoUsers[0];
}

export function getProject(slug: string) {
  return demoProjects.find((project) => project.slug === slug) ?? demoProjects[0];
}

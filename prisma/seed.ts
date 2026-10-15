import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ProgoDemo1!", 12);

  await prisma.report.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.projectUpdate.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.job.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.companyMember.deleteMany();
  await prisma.universityMember.deleteMany();
  await prisma.verificationEvent.deleteMany();
  await prisma.verificationRequest.deleteMany();
  await prisma.projectEvidence.deleteMany();
  await prisma.projectSkill.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.projectFollow.deleteMany();
  await prisma.project.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.connection.deleteMany();
  await prisma.userSkill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.session.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.company.deleteMany();
  await prisma.university.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  const skillNames = [
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
    "AWS",
    "Product Strategy",
    "Research Writing",
    "Swift",
    "Kotlin",
    "Geospatial",
  ];
  const skills = await Promise.all(
    skillNames.map((name) => prisma.skill.create({ data: { name } })),
  );
  const S = Object.fromEntries(skills.map((s) => [s.name, s.id]));

  const people = [
    {
      email: "aarav@progo.dev",
      username: "aarav",
      fullName: "Aarav Sharma",
      headline: "AI/ML Engineer | Building practical AI systems",
      bio: "AI/ML student focused on building practical data and machine learning applications that can be deployed, measured, and improved. I care about evidence: models, repositories, and running systems.",
      country: "India",
      city: "Bengaluru",
      role: "Developer",
      github: "https://github.com/aarav-sharma-demo",
      views: 1240,
      identity: true,
      skills: ["Python", "Machine Learning", "SQL", "Data Analysis", "FastAPI", "PostgreSQL", "XGBoost", "LSTM"],
    },
    {
      email: "meera@progo.dev",
      username: "meera",
      fullName: "Meera Rao",
      headline: "Product designer for technical tools",
      bio: "UI/UX designer who partners with engineers on research, interaction design, and documentation for complex products.",
      country: "India",
      city: "Pune",
      role: "Designer",
      views: 640,
      identity: true,
      skills: ["UI/UX", "Figma", "Product Strategy", "React"],
    },
    {
      email: "rohan@progo.dev",
      username: "rohan",
      fullName: "Rohan Mehta",
      headline: "Data analyst turning operations into decisions",
      bio: "I build dashboards, pipelines, and evaluation reports so teams can see what changed and why.",
      country: "India",
      city: "Mumbai",
      role: "Data professional",
      views: 410,
      identity: true,
      skills: ["SQL", "Data Analysis", "Python", "PostgreSQL"],
    },
    {
      email: "ananya@progo.dev",
      username: "ananya",
      fullName: "Ananya Iyer",
      headline: "Full-stack engineer | Campus products",
      bio: "Building collaboration tools for students with a focus on reliability and clear contribution records.",
      country: "India",
      city: "Chennai",
      role: "Developer",
      views: 880,
      identity: true,
      skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      email: "kabir@progo.dev",
      username: "kabir",
      fullName: "Kabir Shah",
      headline: "Mobile engineer | Safety and maps",
      bio: "I ship native and hybrid mobile experiences around location, safety, and offline-first constraints.",
      country: "India",
      city: "Delhi",
      role: "Developer",
      views: 390,
      identity: false,
      skills: ["Kotlin", "Swift", "Geospatial", "UI/UX"],
    },
    {
      email: "diya@progo.dev",
      username: "diya",
      fullName: "Diya Nair",
      headline: "Climate data researcher",
      bio: "Researcher working on environmental measurement, open datasets, and reproducible notebooks.",
      country: "India",
      city: "Kochi",
      role: "Researcher",
      views: 520,
      identity: true,
      skills: ["Python", "Research Writing", "Data Analysis", "Geospatial"],
    },
    {
      email: "priya@progo.dev",
      username: "priya",
      fullName: "Priya Menon",
      headline: "Health informatics engineer",
      bio: "I design visualization and privacy-aware data flows for health analytics prototypes.",
      country: "India",
      city: "Hyderabad",
      role: "Developer",
      views: 300,
      identity: true,
      skills: ["TypeScript", "React", "Python", "UI/UX"],
    },
    {
      email: "vikram@progo.dev",
      username: "vikram",
      fullName: "Vikram Joshi",
      headline: "Founder | Agri-tech systems",
      bio: "Entrepreneur connecting field data with forecasting models for smallholder farms.",
      country: "India",
      city: "Ahmedabad",
      role: "Entrepreneur",
      views: 710,
      identity: true,
      skills: ["Product Strategy", "Python", "Machine Learning", "AWS"],
    },
    {
      email: "admin@progo.dev",
      username: "admin",
      fullName: "ProGo Admin",
      headline: "Platform operations",
      bio: "Internal verification and moderation account for the ProGo prototype.",
      country: "India",
      city: "Bengaluru",
      role: "Other",
      views: 12,
      identity: true,
      skills: ["Product Strategy"],
      admin: true,
    },
  ] as const;

  const users: Record<string, string> = {};
  for (const p of people) {
    const user = await prisma.user.create({
      data: {
        email: p.email,
        username: p.username,
        passwordHash,
        role: "admin" in p && p.admin ? "ADMIN" : "USER",
        profile: {
          create: {
            fullName: p.fullName,
            headline: p.headline,
            bio: p.bio,
            country: p.country,
            city: p.city,
            role: p.role,
            github: "github" in p ? p.github : null,
            identityVerified: p.identity,
            onboardingComplete: true,
            onboardingStep: 4,
            profileViews: p.views,
            visibility: "PUBLIC",
          },
        },
        skills: {
          create: p.skills.map((name) => ({ skillId: S[name] })),
        },
      },
    });
    users[p.username] = user.id;
  }

  await prisma.education.createMany({
    data: [
      { userId: users.aarav, school: "National Institute of Technology", degree: "B.Tech Computer Science", field: "AI systems", startDate: "2022", endDate: "2026" },
      { userId: users.meera, school: "Srishti Institute", degree: "B.Des", field: "Interaction Design", startDate: "2021", endDate: "2025" },
      { userId: users.ananya, school: "Anna University", degree: "B.E. Computer Science", startDate: "2021", endDate: "2025" },
      { userId: users.diya, school: "IISER", degree: "M.Sc Environmental Science", startDate: "2023", endDate: "2025" },
    ],
  });

  await prisma.experience.createMany({
    data: [
      { userId: users.aarav, company: "Gridlab Studio", role: "ML intern", startDate: "2025", endDate: "2025", description: "Built forecasting notebooks and FastAPI inference endpoints." },
      { userId: users.meera, company: "Northroom", role: "Product design intern", startDate: "2024", endDate: "2025", description: "Research and interface design for developer-facing tools." },
      { userId: users.vikram, company: "Fieldline", role: "Founder", startDate: "2024", description: "Agri analytics prototypes with farmer cooperatives." },
    ],
  });

  await prisma.certification.createMany({
    data: [
      { userId: users.aarav, name: "Deep Learning Specialization (coursework)", issuer: "Independent study", date: "2025" },
      { userId: users.rohan, name: "SQL for Data Analysis", issuer: "Mode Analytics (course)", date: "2024" },
    ],
  });

  await prisma.achievement.createMany({
    data: [
      { userId: users.aarav, title: "Campus energy hackathon — first place", issuer: "NIT Build Week", date: "2025", description: "Prototype of household energy optimization." },
      { userId: users.ananya, title: "Open campus tools grant", issuer: "Student Innovation Cell", date: "2025" },
    ],
  });

  const nirma = await prisma.university.create({
    data: {
      slug: "nirma-institute-demo",
      name: "Nirma Institute of Technology (demo)",
      location: "Ahmedabad, India",
      website: "https://example.edu",
      about: "A fictional university profile used to demonstrate organization verification and student project showcases.",
      verified: true,
      departments: "Computer Science, Design, Environmental Science",
    },
  });

  const helix = await prisma.company.create({
    data: {
      slug: "helix-grid",
      name: "Helix Grid",
      industry: "Energy software",
      location: "Bengaluru, India",
      website: "https://helixgrid.example",
      about: "Fictional company building operational tools for distributed energy. Used to demonstrate organization pages, jobs, and verification.",
      verified: true,
      hue: 205,
    },
  });

  const north = await prisma.company.create({
    data: {
      slug: "northroom",
      name: "Northroom",
      industry: "Design systems",
      location: "Pune, India",
      about: "Fictional product studio collaborating on technical interfaces.",
      verified: false,
      hue: 250,
    },
  });

  await prisma.companyMember.createMany({
    data: [
      { companyId: helix.id, userId: users.aarav, role: "Contributor" },
      { companyId: north.id, userId: users.meera, role: "Designer" },
    ],
  });
  await prisma.universityMember.createMany({
    data: [
      { universityId: nirma.id, userId: users.aarav, role: "Student" },
      { universityId: nirma.id, userId: users.ananya, role: "Student" },
      { universityId: nirma.id, userId: users.diya, role: "Researcher" },
    ],
  });

  type P = {
    slug: string;
    title: string;
    owner: string;
    description: string;
    problem: string;
    solution: string;
    category: string;
    status: string;
    hue: number;
    featured?: boolean;
    companyId?: string;
    universityId?: string;
    skills: string[];
    members: { user: string; role: string; contribution: string; status: string }[];
    evidence: { type: string; title: string; url?: string; description?: string; status: string }[];
    verification?: { level: string; status: string };
  };

  const projects: P[] = [
    {
      slug: "ai-energy-optimizer",
      title: "AI Energy Optimizer",
      owner: "aarav",
      description: "An AI-based platform that predicts household electricity usage and provides optimization recommendations.",
      problem: "Households rarely see which loads drive peak demand, so conservation advice stays generic.",
      solution: "A forecasting model plus a recommendation engine that explains likely usage and suggests timed load shifts.",
      category: "AI & ML",
      status: "COMPLETED",
      hue: 208,
      featured: true,
      companyId: helix.id,
      skills: ["Python", "Machine Learning", "XGBoost", "LSTM", "FastAPI", "PostgreSQL"],
      members: [
        { user: "aarav", role: "Founder · ML Engineer", contribution: "Model development, backend architecture, and deployment.", status: "VERIFIED" },
        { user: "meera", role: "Frontend Developer", contribution: "User research and interface design for the recommendation dashboard.", status: "TEAM_CONFIRMED" },
        { user: "rohan", role: "Data Analyst", contribution: "Feature engineering, evaluation reports, and usage dashboards.", status: "TEAM_CONFIRMED" },
      ],
      evidence: [
        { type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/ai-energy-optimizer", description: "Repository connected.", status: "OWNERSHIP_VERIFIED" },
        { type: "DEMO", title: "Live Demo", url: "https://energy.progo.demo", description: "Deployment connected.", status: "VERIFIED" },
        { type: "DOCS", title: "Documentation", url: "https://docs.energy.progo.demo", description: "Technical documentation.", status: "SUBMITTED" },
        { type: "TEAM", title: "Team Confirmation", description: "Contributors confirmed listed work.", status: "VERIFIED" },
      ],
      verification: { level: "CONTRIBUTION_VERIFIED", status: "APPROVED" },
    },
    {
      slug: "saferoute",
      title: "SafeRoute",
      owner: "kabir",
      description: "AI-assisted travel safety platform that highlights well-lit routes and recent incident context.",
      problem: "Standard maps optimize for time, not for situational safety after dark.",
      solution: "A routing layer that weights lighting, crowd density proxies, and reported incidents.",
      category: "Mobile",
      status: "BETA",
      hue: 192,
      skills: ["Kotlin", "Swift", "Geospatial", "Python"],
      members: [
        { user: "kabir", role: "Mobile Engineer", contribution: "Android routing client and offline cache.", status: "PENDING" },
        { user: "ananya", role: "Backend Engineer", contribution: "Route scoring API and incident ingestion.", status: "PENDING" },
      ],
      evidence: [
        { type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/saferoute", status: "SUBMITTED" },
        { type: "SCREENSHOTS", title: "Screenshots", description: "Night-mode routing screens.", status: "SUBMITTED" },
      ],
      verification: { level: "EVIDENCE_SUBMITTED", status: "PENDING" },
    },
    {
      slug: "campusconnect",
      title: "CampusConnect",
      owner: "ananya",
      description: "Student collaboration platform for clubs, project teams, and campus research groups.",
      problem: "Project teams form in chat apps and lose contribution history when people graduate.",
      solution: "Shared project spaces with roles, evidence links, and a public showcase.",
      category: "Web Development",
      status: "ACTIVE",
      hue: 226,
      universityId: nirma.id,
      skills: ["TypeScript", "Next.js", "PostgreSQL", "UI/UX"],
      members: [
        { user: "ananya", role: "Lead Engineer", contribution: "Application architecture and auth.", status: "VERIFIED" },
        { user: "meera", role: "Product Designer", contribution: "Information architecture and component system.", status: "TEAM_CONFIRMED" },
      ],
      evidence: [
        { type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/campusconnect", status: "OWNERSHIP_VERIFIED" },
        { type: "DEMO", title: "Live Demo", url: "https://campus.progo.demo", status: "VERIFIED" },
      ],
      verification: { level: "EVIDENCE_VERIFIED", status: "APPROVED" },
    },
    {
      slug: "healthlens",
      title: "HealthLens",
      owner: "priya",
      description: "Health data visualization platform for clinic-style prototype datasets.",
      problem: "Clinicians receive exports that are hard to scan for trends across visits.",
      solution: "A visualization layer with access logs and de-identified sample data.",
      category: "Data",
      status: "BUILDING",
      hue: 168,
      skills: ["TypeScript", "React", "Python", "UI/UX"],
      members: [{ user: "priya", role: "Engineer", contribution: "Chart system and privacy notes.", status: "PENDING" }],
      evidence: [{ type: "DOCS", title: "Documentation", url: "https://healthlens.progo.demo/docs", status: "SUBMITTED" }],
    },
    {
      slug: "ecotrack",
      title: "EcoTrack",
      owner: "diya",
      description: "Environmental impact tracking platform for campus and neighborhood measurements.",
      problem: "Local climate action groups collect readings in spreadsheets that never become shared evidence.",
      solution: "A measurement log with maps, methodology notes, and public summaries.",
      category: "Research",
      status: "ACTIVE",
      hue: 152,
      universityId: nirma.id,
      skills: ["Python", "Research Writing", "Geospatial", "Data Analysis"],
      members: [
        { user: "diya", role: "Research lead", contribution: "Methodology, data pipeline, and reports.", status: "VERIFIED" },
        { user: "rohan", role: "Analyst", contribution: "Quality checks and visualization.", status: "TEAM_CONFIRMED" },
      ],
      evidence: [
        { type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/ecotrack", status: "OWNERSHIP_VERIFIED" },
        { type: "DOCS", title: "Documentation", description: "Sampling protocol.", status: "VERIFIED" },
      ],
      verification: { level: "ORGANIZATION_VERIFIED", status: "APPROVED" },
    },
    {
      slug: "finsight",
      title: "FinSight",
      owner: "aarav",
      description: "Personal finance analytics dashboard with categorized spending and scenario views.",
      problem: "Bank statements do not explain trade-offs between saving goals.",
      solution: "Ingested CSVs, category models, and goal simulations.",
      category: "Data",
      status: "BETA",
      hue: 262,
      skills: ["Python", "SQL", "FastAPI", "React"],
      members: [
        { user: "aarav", role: "ML Engineer", contribution: "Categorization model and API.", status: "PENDING" },
        { user: "priya", role: "Frontend", contribution: "Dashboard layouts.", status: "PENDING" },
      ],
      evidence: [{ type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/finsight", status: "SUBMITTED" }],
      verification: { level: "EVIDENCE_SUBMITTED", status: "PENDING" },
    },
    {
      slug: "agrivision",
      title: "AgriVision",
      owner: "vikram",
      description: "Agricultural analytics platform for yield signals and irrigation advice.",
      problem: "Smallholder farms get weather alerts without field-level context.",
      solution: "Satellite proxies plus farmer-reported observations in a simple operations view.",
      category: "AI & ML",
      status: "ACTIVE",
      hue: 122,
      skills: ["Python", "Machine Learning", "AWS", "Product Strategy"],
      members: [
        { user: "vikram", role: "Founder", contribution: "Problem framing, field interviews, product scope.", status: "TEAM_CONFIRMED" },
        { user: "aarav", role: "ML collaborator", contribution: "Baseline vegetation index model.", status: "PENDING" },
      ],
      evidence: [
        { type: "DEMO", title: "Live Demo", url: "https://agri.progo.demo", status: "SUBMITTED" },
        { type: "VIDEO", title: "Demo Video", description: "Field walkthrough (placeholder URL).", status: "SUBMITTED" },
      ],
    },
    {
      slug: "retailpulse",
      title: "RetailPulse",
      owner: "rohan",
      description: "Retail sales forecasting platform for multi-store weekly planning.",
      problem: "Store managers plan inventory from last week’s totals, missing holiday and weather effects.",
      solution: "A forecasting workbook with explainable drivers and a planner export.",
      category: "Business",
      status: "COMPLETED",
      hue: 32,
      skills: ["SQL", "Data Analysis", "Python", "PostgreSQL"],
      members: [{ user: "rohan", role: "Analyst", contribution: "Forecast evaluation and planner export.", status: "VERIFIED" }],
      evidence: [
        { type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/retailpulse", status: "OWNERSHIP_VERIFIED" },
        { type: "DOCS", title: "Documentation", status: "VERIFIED" },
      ],
      verification: { level: "EVIDENCE_VERIFIED", status: "APPROVED" },
    },
    {
      slug: "meshlearn",
      title: "MeshLearn",
      owner: "meera",
      description: "Study-group coordination with shared briefs and critique sessions.",
      problem: "Peer learning dies in unstructured group chats.",
      solution: "Session templates, critique notes, and a public work wall.",
      category: "Design",
      status: "BUILDING",
      hue: 280,
      skills: ["UI/UX", "Figma", "Product Strategy"],
      members: [{ user: "meera", role: "Designer", contribution: "Service design and prototype.", status: "PENDING" }],
      evidence: [],
    },
    {
      slug: "civicsignal",
      title: "CivicSignal",
      owner: "diya",
      description: "Public-issue tracker that links reports to source documents.",
      problem: "Civic updates circulate without citations.",
      solution: "A timeline of issues with attached documents and change logs.",
      category: "Research",
      status: "IDEA",
      hue: 200,
      skills: ["Research Writing", "TypeScript"],
      members: [{ user: "diya", role: "Researcher", contribution: "Issue taxonomy and source protocol.", status: "PENDING" }],
      evidence: [],
    },
    {
      slug: "novanotes",
      title: "NovaNotes",
      owner: "ananya",
      description: "Research notebook with citations and reproducible experiment cards.",
      problem: "Lab notes and code live in different tools.",
      solution: "Linked notes, code snippets, and exportable experiment cards.",
      category: "Web Development",
      status: "BETA",
      hue: 218,
      skills: ["Next.js", "TypeScript", "PostgreSQL"],
      members: [{ user: "ananya", role: "Engineer", contribution: "Editor and export pipeline.", status: "PENDING" }],
      evidence: [{ type: "GITHUB", title: "GitHub Repository", url: "https://github.com/progo-demo/novanotes", status: "SUBMITTED" }],
    },
    {
      slug: "tidewatch",
      title: "TideWatch",
      owner: "kabir",
      description: "Coastal condition alerts combining public tide data with local reports.",
      problem: "Fishers and coastal walkers get generic weather, not tide-aware alerts.",
      solution: "A lightweight alert client with subscribed locations.",
      category: "Hardware",
      status: "BUILDING",
      hue: 188,
      skills: ["Kotlin", "Python", "Geospatial"],
      members: [{ user: "kabir", role: "Engineer", contribution: "Alert client and data polling.", status: "PENDING" }],
      evidence: [],
    },
  ];

  for (const p of projects) {
    const project = await prisma.project.create({
      data: {
        ownerId: users[p.owner],
        title: p.title,
        slug: p.slug,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        category: p.category,
        status: p.status,
        startDate: new Date("2024-08-01"),
        endDate: p.status === "COMPLETED" ? new Date("2025-12-01") : null,
        visibility: "PUBLIC",
        coverHue: p.hue,
        featured: Boolean(p.featured),
        companyId: p.companyId,
        universityId: p.universityId,
        skills: { create: p.skills.map((name) => ({ skillId: S[name] })) },
        members: {
          create: p.members.map((m) => ({
            userId: users[m.user],
            role: m.role,
            contributionDescription: m.contribution,
            contributionStatus: m.status,
          })),
        },
        evidence: {
          create: p.evidence.map((e) => ({
            type: e.type,
            title: e.title,
            url: e.url,
            description: e.description,
            verificationStatus: e.status,
          })),
        },
      },
    });

    if (p.verification) {
      await prisma.verificationRequest.create({
        data: {
          projectId: project.id,
          requestedLevel: p.verification.level,
          status: p.verification.status,
          claims: "See listed evidence and contribution records.",
          submittedAt: new Date(),
          reviewedAt: p.verification.status === "APPROVED" ? new Date() : null,
          reviewerId: p.verification.status === "APPROVED" ? users.admin : null,
        },
      });
    }
  }

  await prisma.follow.createMany({
    data: [
      { followerId: users.meera, followingId: users.aarav },
      { followerId: users.rohan, followingId: users.aarav },
      { followerId: users.ananya, followingId: users.aarav },
      { followerId: users.aarav, followingId: users.meera },
      { followerId: users.aarav, followingId: users.ananya },
      { followerId: users.diya, followingId: users.vikram },
      { followerId: users.priya, followingId: users.ananya },
    ],
  });

  await prisma.connection.createMany({
    data: [
      { requesterId: users.aarav, addresseeId: users.meera, status: "ACCEPTED" },
      { requesterId: users.aarav, addresseeId: users.rohan, status: "ACCEPTED" },
      { requesterId: users.ananya, addresseeId: users.aarav, status: "PENDING" },
      { requesterId: users.vikram, addresseeId: users.diya, status: "ACCEPTED" },
    ],
  });

  const energy = await prisma.project.findUniqueOrThrow({ where: { slug: "ai-energy-optimizer" } });
  await prisma.activity.createMany({
    data: [
      { actorId: users.aarav, type: "PROJECT_PUBLISHED", content: "Aarav Sharma published a new project.", projectId: energy.id },
      { actorId: users.meera, type: "CONTRIBUTION", content: "Meera Rao confirmed a contribution on AI Energy Optimizer.", projectId: energy.id },
      { actorId: users.ananya, type: "PROJECT_UPDATE", content: "CampusConnect reached an active campus pilot.", projectId: (await prisma.project.findUniqueOrThrow({ where: { slug: "campusconnect" } })).id },
      { actorId: users.diya, type: "ACHIEVEMENT", content: "EcoTrack published a sampling protocol for campus sensors." },
      { actorId: users.vikram, type: "COLLABORATION", content: "Looking for collaborators on AgriVision field data labeling." },
      { actorId: users.rohan, type: "PROJECT_LAUNCH", content: "RetailPulse completed its first planner export for a demo store set." },
    ],
  });

  await prisma.notification.createMany({
    data: [
      { userId: users.aarav, type: "FOLLOW", content: "Meera Rao followed you.", href: "/profile/meera" },
      { userId: users.aarav, type: "CONNECTION", content: "Ananya Iyer sent a connection request.", href: "/network" },
      { userId: users.aarav, type: "VERIFICATION", content: "Your project evidence was verified on AI Energy Optimizer.", href: "/projects/ai-energy-optimizer" },
      { userId: users.aarav, type: "TEAM", content: "A teammate confirmed your contribution.", href: "/projects/ai-energy-optimizer" },
      { userId: users.meera, type: "INVITE", content: "Someone invited you to a project.", href: "/projects/ai-energy-optimizer" },
      { userId: users.kabir, type: "VERIFICATION", content: "Verification requires additional evidence for SafeRoute.", href: "/projects/saferoute" },
      { userId: users.ananya, type: "FEATURED", content: "CampusConnect was featured in Explore.", href: "/projects/campusconnect" },
    ],
  });

  await prisma.job.createMany({
    data: [
      {
        companyId: helix.id,
        title: "Applied ML Engineer",
        location: "Bengaluru",
        workMode: "Hybrid",
        experience: "1–3 years",
        description: "Work on forecasting models with documented evaluation. Projects with deployed inference are relevant.",
        skills: "Python, Machine Learning, FastAPI",
        verificationReq: "Evidence verified project preferred",
        projectReq: "At least one public ML project with a repository",
      },
      {
        companyId: north.id,
        title: "Product Designer",
        location: "Pune",
        workMode: "Remote",
        experience: "0–2 years",
        description: "Design interfaces for technical products. Case studies should show research and shipped UI.",
        skills: "UI/UX, Figma",
        verificationReq: "None",
        projectReq: "Portfolio project with process notes",
      },
    ],
  });

  await prisma.challenge.create({
    data: {
      companyId: helix.id,
      title: "Peak-shaving recommendation challenge",
      description: "Propose an evaluation method for household load-shift recommendations using public demo data.",
    },
  });

  await prisma.report.create({
    data: {
      reporterId: users.meera,
      targetType: "PROJECT",
      targetId: (await prisma.project.findUniqueOrThrow({ where: { slug: "civicsignal" } })).id,
      reason: "Misleading information",
      description: "Demo report: idea-stage project should not be read as a deployed civic product.",
      status: "OPEN",
    },
  });

  console.log("Seeded ProGo demo data. Login: aarav@progo.dev / ProgoDemo1!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

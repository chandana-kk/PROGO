"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, clearSession, hashPassword, verifyPassword, getSession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { RESERVED_PROFILE_SLUGS } from "@/lib/constants";

const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().email().max(120),
  password: z.string().min(8).max(72),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]{3,24}$/),
  role: z.string().min(2).max(40),
  country: z.string().min(2).max(60),
  terms: z.literal("on"),
});

export async function signupAction(_prev: unknown, formData: FormData) {
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    username: formData.get("username"),
    role: formData.get("role"),
    country: formData.get("country"),
    terms: formData.get("terms"),
  });
  if (!parsed.success) return { error: "Check the form fields and try again." };
  if (RESERVED_PROFILE_SLUGS.includes(parsed.data.username)) {
    return { error: "That username is reserved." };
  }
  const limit = rateLimit(`signup:${parsed.data.email}`);
  if (!limit.ok) return { error: "Too many attempts. Please wait a minute." };

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email: parsed.data.email.toLowerCase() }, { username: parsed.data.username }] },
  });
  if (exists) return { error: "An account with that email or username already exists." };

  const user = await prisma.user.create({
    data: {
      email: parsed.data.email.toLowerCase(),
      username: parsed.data.username,
      passwordHash: await hashPassword(parsed.data.password),
      profile: {
        create: {
          fullName: parsed.data.fullName,
          role: parsed.data.role,
          country: parsed.data.country,
          onboardingComplete: false,
          onboardingStep: 1,
          visibility: "PUBLIC",
        },
      },
    },
  });
  await createSession(user);
  redirect("/onboarding");
}

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };
  const limit = rateLimit(`login:${email}`, 10);
  if (!limit.ok) return { error: "Too many attempts. Please wait a minute." };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "Incorrect email or password." };
  }
  await createSession(user);
  const profile = await prisma.profile.findUnique({ where: { userId: user.id } });
  redirect(profile?.onboardingComplete ? "/home" : "/onboarding");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function completeOnboarding(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");
  const role = String(formData.get("role") ?? session.fullName);
  const skills = formData.getAll("skills").map(String);
  const skipProject = formData.get("skipProject") === "on";
  await prisma.profile.update({
    where: { userId: session.id },
    data: {
      role,
      onboardingComplete: true,
      onboardingStep: 4,
    },
  });
  if (skills.length) {
    const rows = await prisma.skill.findMany({ where: { name: { in: skills } } });
    await prisma.userSkill.deleteMany({ where: { userId: session.id } });
    await prisma.userSkill.createMany({
      data: rows.map((s: { id: string }) => ({ userId: session.id, skillId: s.id })),
    });
  }
  redirect(skipProject ? "/home" : "/projects/create");
}

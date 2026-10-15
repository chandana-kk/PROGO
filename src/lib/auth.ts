import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE = "progo_session";

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not configured");
  return new TextEncoder().encode(s);
}

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  role: string;
  fullName: string;
  onboardingComplete: boolean;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: { id: string; email: string; username: string; role: string }) {
  const token = await new SignJWT({
    email: user.email,
    username: user.username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  await prisma.session.create({
    data: { userId: user.id, userAgent: "web" },
  });
  await prisma.auditLog.create({
    data: { actorId: user.id, action: "LOGIN", target: user.id },
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function readToken() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const payload = await readToken();
  if (!payload?.sub) return null;
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    include: { profile: true },
  });
  if (!user || !user.profile) return null;
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    fullName: user.profile.fullName,
    onboardingComplete: user.profile.onboardingComplete,
  };
}

export async function requireUser() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

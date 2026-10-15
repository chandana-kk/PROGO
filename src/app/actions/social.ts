"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/auth";

async function me() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function updateProfileAction(_prev: unknown, formData: FormData) {
  const session = await me();
  await prisma.profile.update({
    where: { userId: session.id },
    data: {
      fullName: String(formData.get("fullName") ?? "").trim() || undefined,
      headline: String(formData.get("headline") ?? "") || null,
      bio: String(formData.get("bio") ?? "") || null,
      city: String(formData.get("city") ?? "") || null,
      country: String(formData.get("country") ?? "") || null,
      website: String(formData.get("website") ?? "") || null,
      github: String(formData.get("github") ?? "") || null,
      linkedin: String(formData.get("linkedin") ?? "") || null,
      portfolio: String(formData.get("portfolio") ?? "") || null,
      role: String(formData.get("role") ?? "") || null,
      visibility: String(formData.get("visibility") ?? "PUBLIC"),
    },
  });
  revalidatePath("/profile");
  return { ok: true, message: "Profile updated." };
}

export async function followUserAction(userId: string) {
  const session = await me();
  if (session.id === userId) return;
  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId: session.id, followingId: userId } },
  });
  if (existing) {
    await prisma.follow.delete({
      where: { followerId_followingId: { followerId: session.id, followingId: userId } },
    });
  } else {
    await prisma.follow.create({ data: { followerId: session.id, followingId: userId } });
    await prisma.notification.create({
      data: {
        userId,
        type: "FOLLOW",
        content: `${session.fullName} followed you.`,
        href: `/profile/${session.username}`,
      },
    });
  }
  revalidatePath("/network");
}

export async function connectUserAction(userId: string) {
  const session = await me();
  if (session.id === userId) return;
  await prisma.connection.upsert({
    where: {
      requesterId_addresseeId: { requesterId: session.id, addresseeId: userId },
    },
    update: { status: "PENDING" },
    create: { requesterId: session.id, addresseeId: userId, status: "PENDING" },
  });
  await prisma.notification.create({
    data: {
      userId,
      type: "CONNECTION",
      content: `${session.fullName} sent a connection request.`,
      href: "/network",
    },
  });
  revalidatePath("/network");
}

export async function respondConnectionAction(id: string, accept: boolean) {
  const session = await me();
  const conn = await prisma.connection.findUnique({ where: { id } });
  if (!conn || conn.addresseeId !== session.id) return;
  await prisma.connection.update({
    where: { id },
    data: { status: accept ? "ACCEPTED" : "REJECTED" },
  });
  revalidatePath("/network");
}

export async function createActivityAction(formData: FormData) {
  const session = await me();
  const type = String(formData.get("type") ?? "PROJECT_UPDATE");
  const content = String(formData.get("content") ?? "").trim();
  if (content.length < 8) return { error: "Write a short professional update." };
  await prisma.activity.create({
    data: { actorId: session.id, type, content },
  });
  revalidatePath("/home");
  return { ok: true };
}

export async function markNotificationsRead() {
  const session = await me();
  await prisma.notification.updateMany({ where: { userId: session.id }, data: { read: true } });
  revalidatePath("/notifications");
}

export async function reportAction(formData: FormData) {
  const session = await me();
  await prisma.report.create({
    data: {
      reporterId: session.id,
      targetType: String(formData.get("targetType") ?? "PROJECT"),
      targetId: String(formData.get("targetId") ?? ""),
      reason: String(formData.get("reason") ?? "Other"),
      description: String(formData.get("description") ?? "") || null,
    },
  });
  return { ok: true };
}

export async function updateSettingsAction(formData: FormData) {
  const session = await me();
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  if (email) {
    await prisma.user.update({ where: { id: session.id }, data: { email } });
  }
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  if (next) {
    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user || !(await verifyPassword(current, user.passwordHash))) {
      return { error: "Current password is incorrect." };
    }
    if (next.length < 8) return { error: "New password must be at least 8 characters." };
    await prisma.user.update({ where: { id: session.id }, data: { passwordHash: await hashPassword(next) } });
  }
  await prisma.profile.update({
    where: { userId: session.id },
    data: { visibility: String(formData.get("visibility") ?? "PUBLIC") },
  });
  return { ok: true, message: "Account updated." };
}

export async function deleteAccountAction() {
  const session = await me();
  await prisma.auditLog.create({ data: { actorId: session.id, action: "ACCOUNT_DELETE", target: session.id } });
  await prisma.user.delete({ where: { id: session.id } });
  redirect("/");
}

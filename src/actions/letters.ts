"use server";

import { and, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { letters } from "@/lib/db/schema";
import { decrypt, encrypt, hashPassword } from "@/lib/encryption";
import { letterSchema } from "@/lib/validation";

function deriveLetterKey(letterId: string): string {
  return `letter-${process.env.APP_SECRET}-${letterId}`;
}

export type CreateLetterState = {
  error: string | Record<string, string[]> | null;
};

export async function createLetter(
  _prevState: CreateLetterState | null,
  formData: FormData,
): Promise<CreateLetterState> {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return { error: "Not authenticated" };
  }

  const raw = {
    recipientName: formData.get("recipientName"),
    content: formData.get("content"),
    templateId: formData.get("templateId") || undefined,
    password: formData.get("password") || undefined,
  };

  const parsed = letterSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { recipientName, content, templateId, password } = parsed.data;
  const slug = nanoid(21);

  let passwordHash: string | null = null;
  let encryptionPassword: string;

  if (password && password.length > 0) {
    passwordHash = hashPassword(password);
    encryptionPassword = password;
  } else {
    encryptionPassword = deriveLetterKey(slug);
  }

  const { ciphertext, iv, salt } = encrypt(content, encryptionPassword);

  await db.insert(letters).values({
    userId: session.user.id,
    templateId: templateId || null,
    recipientName,
    content: ciphertext,
    contentIv: iv,
    contentSalt: salt,
    passwordHash,
    slug,
  });

  redirect(`/letter/${slug}`);
}

export async function getLetter(slug: string, password?: string) {
  const result = await db
    .select()
    .from(letters)
    .where(eq(letters.slug, slug))
    .limit(1);

  if (result.length === 0) {
    return { error: "Letter not found" };
  }

  const letter = result[0];

  if (letter.passwordHash && !password) {
    return { needsPassword: true, recipientName: letter.recipientName };
  }

  if (letter.passwordHash && password) {
    if (hashPassword(password) !== letter.passwordHash) {
      return { error: "Incorrect password" };
    }

    const decrypted = decrypt(
      letter.content,
      letter.contentIv,
      letter.contentSalt,
      password,
    );

    return {
      id: letter.id,
      recipientName: letter.recipientName,
      content: decrypted,
      templateId: letter.templateId,
      hasPassword: true,
      createdAt: letter.createdAt.toISOString(),
    };
  }

  const decrypted = decrypt(
    letter.content,
    letter.contentIv,
    letter.contentSalt,
    deriveLetterKey(slug),
  );

  return {
    id: letter.id,
    recipientName: letter.recipientName,
    content: decrypted,
    templateId: letter.templateId,
    hasPassword: false,
    createdAt: letter.createdAt.toISOString(),
  };
}

export type VerifyPasswordState = {
  content?: string;
  recipientName?: string;
  error?: string;
};

export async function verifyLetterPassword(
  _prev: VerifyPasswordState | null,
  formData: FormData,
): Promise<VerifyPasswordState> {
  const slug = formData.get("slug") as string;
  const password = formData.get("password") as string;

  if (!slug || !password) {
    return { error: "Password is required" };
  }

  const result = await getLetter(slug, password);

  if ("error" in result && result.error) {
    return { error: result.error };
  }

  if ("needsPassword" in result) {
    return { error: "Password is required" };
  }

  return {
    content: result.content,
    recipientName: result.recipientName,
  };
}

export async function getUserLetters() {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return [];
  }

  const result = await db
    .select({
      id: letters.id,
      recipientName: letters.recipientName,
      slug: letters.slug,
      createdAt: letters.createdAt,
      passwordHash: letters.passwordHash,
      templateId: letters.templateId,
    })
    .from(letters)
    .where(eq(letters.userId, session.user.id))
    .orderBy(desc(letters.createdAt))
    .limit(50);

  return result.map((l) => ({
    id: l.id,
    recipientName: l.recipientName,
    slug: l.slug,
    hasPassword: l.passwordHash !== null,
    createdAt: l.createdAt.toISOString(),
    templateId: l.templateId,
  }));
}

export async function deleteLetter(letterId: string) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return { error: "Not authenticated" };
  }

  await db
    .delete(letters)
    .where(and(eq(letters.id, letterId), eq(letters.userId, session.user.id)));

  return { success: true };
}

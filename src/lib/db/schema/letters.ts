import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const letters = pgTable("letters", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  templateId: text("template_id"),
  recipientName: text("recipient_name").notNull(),
  content: text("content").notNull(),
  contentIv: text("content_iv").notNull(),
  contentSalt: text("content_salt").notNull(),
  passwordHash: text("password_hash"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

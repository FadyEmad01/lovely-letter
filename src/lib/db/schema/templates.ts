import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const templates = pgTable("templates", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  designConfig: jsonb("design_config").notNull(),
  fontFamily: text("font_family"),
  backgroundImage: text("background_image"),
  thumbnailUrl: text("thumbnail_url"),
  isPublic: boolean("is_public").default(true).notNull(),
  isOfficial: boolean("is_official").default(false).notNull(),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

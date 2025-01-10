import { varchar, timestamp, text, uuid, pgTable } from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const coders = pgTable("coders", {
  id: varchar("id").primaryKey(),
  username: varchar("username").notNull(),
  email: varchar("email").unique().notNull(),
});

export const scribes = pgTable("scribes", {
  id: varchar("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  html: text("html"),
  js: text("js"),
  css: text("css"),
  authorId: varchar("authorId")
    .notNull()
    .references(() => coders.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const coderRelations = relations(coders, ({ many }) => ({
  scribes: many(scribes),
}));

export const scribeRelations = relations(scribes, ({ one }) => ({
  coder: one(coders, {
    fields: [scribes.authorId],
    references: [coders.id],
  }),
}));

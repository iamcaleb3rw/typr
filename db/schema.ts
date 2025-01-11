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

export const likes = pgTable("likes", {
  id: varchar("id").primaryKey(),
  scribeId: varchar("scribeId")
    .notNull()
    .references(() => scribes.id, { onDelete: "cascade" }),
  coderId: varchar("coderId")
    .notNull()
    .references(() => coders.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const coderRelations = relations(coders, ({ many }) => ({
  scribes: many(scribes),
  likes: many(likes),
}));

export const scribeRelations = relations(scribes, ({ one, many }) => ({
  coder: one(coders, {
    fields: [scribes.authorId],
    references: [coders.id],
  }),
  likes: many(likes),
}));

export const likeRelations = relations(likes, ({ one }) => ({
  scribe: one(scribes, {
    fields: [likes.scribeId],
    references: [scribes.id],
  }),
  coder: one(coders, {
    fields: [likes.coderId],
    references: [coders.id],
  }),
}));

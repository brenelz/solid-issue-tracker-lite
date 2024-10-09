import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client);

export const usersTable = sqliteTable('users', {
  id: text('id'),
  username: text('username'),
  email: text('email'),
  avatar: text('avatar'),
  firstName: text('firstName'),
  lastName: text('lastName'),
});

export const issuesTable = sqliteTable('issues', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  ownerId: text('ownerId').notNull(),
  assignedId: text('assignedId'),
  parentIssueId: integer('parentIssueId'),
  title: text('title'),
  description: text('description'),
  stacktrace: text('stacktrace'),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  resolvedAt: text("resolvedAt")
});

export const notificationsTable = sqliteTable('notifications', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull(),
  issueId: text('issueId'),
  title: text('title'),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  readAt: text("timestamp")
});

export type IssueRow = typeof issuesTable.$inferSelect;
export type NotificationRow = typeof notificationsTable.$inferSelect;
export type UserRow = typeof usersTable.$inferSelect;
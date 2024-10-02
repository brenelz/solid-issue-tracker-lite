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
  ownerId: text('ownerId').notNull().references(() => usersTable.id),
  assignedId: text('assignedId').references(() => usersTable.id),
  parentIssueId: integer('parentIssueId'),
  title: text('title'),
  description: text('description'),
  stacktrace: text('stacktrace'),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  resolvedAt: text("timestamp")
});

export const notificationsTable = sqliteTable('notifications', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: text('userId').notNull().references(() => usersTable.id),
  issueId: text('issueId').references(() => issuesTable.id),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  readAt: text("timestamp")
});
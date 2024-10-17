import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { and, eq, isNotNull, isNull, or, sql } from "drizzle-orm";

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
  priority: text('priority').default("low"),
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

export const getIssueFromDb = async (userId: string, issueId: number) => {
  "use server";

  const issues = await db.select().from(issuesTable).where(
    and(
      eq(issuesTable.id, issueId),
      or(
        eq(issuesTable.assignedId, userId), eq(issuesTable.ownerId, userId)
      ),
    ));

  return issues[0];
}

export const getIssuesFromDb = async (props: { userId: string, date?: string, assigned?: boolean, resolved?: boolean }) => {
  "use server";

  const query = await db.select().from(issuesTable).where(and(
    ...(props.date ? [eq(sql`DATE(${issuesTable.createdAt})`, props.date)] : []),
    eq(props.assigned ? issuesTable.assignedId : issuesTable.ownerId, props.userId),
    props.resolved ? isNotNull(issuesTable.resolvedAt) : isNull(issuesTable.resolvedAt)
  )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
    .orderBy(sql`${issuesTable.createdAt} desc`);

  const queryWithAssignedUser = query.map(query => ({
    ...query.issues,
    assignedUser: query.users
  }));

  return queryWithAssignedUser;
}
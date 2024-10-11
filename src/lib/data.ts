import { cache, redirect } from "@solidjs/router";
import { db, IssueRow, issuesTable, notificationsTable, UserRow, usersTable } from "./db";
import { and, eq, isNotNull, isNull, or, sql } from "drizzle-orm";
import { codeToHtml } from 'shiki'
import { auth } from "clerk-solidjs/server";

export type IssueWithAssignedUser = IssueRow & {
    assignedUser: UserRow | null
}

export const getAllUserIssues = cache(async (date?: string) => {
    "use server";

    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const unresolvedQuery = await db.select().from(issuesTable).where(and(
        ...(date ? [eq(issuesTable.createdAt, date)] : []),
        eq(issuesTable.ownerId, authObject.userId),
        isNull(issuesTable.resolvedAt)
    )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const resolvedQuery = await db.select().from(issuesTable).where(and(
        ...(date ? [eq(issuesTable.createdAt, date)] : []),
        eq(issuesTable.ownerId, authObject.userId),
        isNotNull(issuesTable.resolvedAt)
    )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const unresolved = unresolvedQuery.map(query => ({
        ...query.issues,
        assignedUser: query.users
    }));

    const resolved = resolvedQuery.map(query => ({
        ...query.issues,
        assignedUser: query.users
    }));

    return {
        unresolved,
        resolved
    };

}, "get-all-user-issues");

export const getAllAssignedIssues = cache(async (date?: string) => {
    "use server";
    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const unresolvedQuery = await db.select().from(issuesTable).where(and(
        ...(date ? [eq(issuesTable.createdAt, date)] : []),
        eq(issuesTable.assignedId, authObject.userId),
        isNull(issuesTable.resolvedAt)
    )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const resolvedQuery = await db.select().from(issuesTable).where(and(
        ...(date ? [eq(issuesTable.createdAt, date)] : []),
        eq(issuesTable.assignedId, authObject.userId),
        isNotNull(issuesTable.resolvedAt)
    )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const unresolved = unresolvedQuery.map(query => ({
        ...query.issues,
        assignedUser: query.users
    }));

    const resolved = resolvedQuery.map(query => ({
        ...query.issues,
        assignedUser: query.users
    }));

    return {
        unresolved,
        resolved,
    };

}, "get-all-assigned-issues");

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

export const getIssue = cache(async (issueId: number) => {
    "use server";

    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const issue = await getIssueFromDb(authObject.userId, issueId);

    let assignedUser = null;
    if (issue.assignedId) {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, issue.assignedId));
        assignedUser = user[0];
    }

    const issueToReturn = {
        ...issue,
        assignedUser: assignedUser
    }

    return issueToReturn

}, "get-issue");

export const getUsers = cache(async () => {
    "use server";

    const users = await db.select().from(usersTable);

    return users;

}, "get-users");

export const renderCode = cache(async (srcCode: string) => {
    "use server";

    return codeToHtml(srcCode, {
        lang: "jsx",
        theme: "material-theme-ocean",
    });
}, "render-code");

export const getNotificationsForUser = cache(async () => {
    "use server";

    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const notifications = await db.select().from(notificationsTable)
        .innerJoin(issuesTable, eq(issuesTable.id, notificationsTable.issueId))
        .where(eq(notificationsTable.userId, authObject.userId))
        .orderBy(sql`${notificationsTable.createdAt} desc`);

    return notifications;

}, "get-notifications-for-user");
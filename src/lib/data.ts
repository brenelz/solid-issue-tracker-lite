import { cache } from "@solidjs/router";
import { db, IssueRow, issuesTable, notificationsTable, UserRow, usersTable } from "./db";
import { and, eq, isNotNull, isNull, or, sql } from "drizzle-orm";
import { codeToHtml } from 'shiki'

export type IssueWithAssignedUser = IssueRow & {
    assignedUser?: UserRow
}

export const getAllUserIssues = cache(async (userId: string, date: string) => {
    "use server";

    if (date && date !== '') {
        const unresolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.createdAt, date),
            eq(issuesTable.ownerId, userId),
            isNull(issuesTable.resolvedAt)
        )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
            .orderBy(sql`${issuesTable.createdAt} desc`);

        const resolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.createdAt, date),
            eq(issuesTable.ownerId, userId),
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
    } else {
        const unresolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.ownerId, userId),
            isNull(issuesTable.resolvedAt)
        )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
            .orderBy(sql`${issuesTable.createdAt} desc`);

        const resolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.ownerId, userId),
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
    }

}, "get-all-user-issues");

export const getAllAssignedIssues = cache(async (userId: string, date: string) => {
    "use server";

    if (date !== '') {
        const unresolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.createdAt, date),
            eq(issuesTable.assignedId, userId),
            isNull(issuesTable.resolvedAt)
        )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
            .orderBy(sql`${issuesTable.createdAt} desc`);

        const resolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.createdAt, date),
            eq(issuesTable.assignedId, userId),
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
    } else {
        const unresolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.assignedId, userId),
            isNull(issuesTable.resolvedAt)
        )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
            .orderBy(sql`${issuesTable.createdAt} desc`);

        const resolvedQuery = await db.select().from(issuesTable).where(and(
            eq(issuesTable.assignedId, userId),
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
    }

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

export const getIssue = cache(async (userId: string, issueId: number) => {
    "use server";

    const issue = await getIssueFromDb(userId, issueId);

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

export const getNotificationsForUser = cache(async (userId: string) => {
    "use server";

    const notifications = await db.select().from(notificationsTable)
        .innerJoin(issuesTable, eq(issuesTable.id, notificationsTable.issueId))
        .where(eq(notificationsTable.userId, userId))
        .orderBy(sql`${notificationsTable.createdAt} desc`)
        .limit(3);

    return notifications;

}, "get-notifications-for-user");
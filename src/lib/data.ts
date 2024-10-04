import { cache } from "@solidjs/router";
import { db, IssueRow, issuesTable, UserRow, usersTable } from "./db";
import { and, eq, isNotNull, isNull, or, sql } from "drizzle-orm";
import { codeToHtml } from 'shiki'

export type IssueWithAssignedUser = IssueRow & {
    assignedUser?: UserRow
}

export const getAllUserIssues = cache(async (userId: string) => {
    "use server";

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

}, "get-all-user-issues");

export const getAllAssignedIssues = cache(async (userId: string) => {
    "use server";

    const unresolvedQuery = await db.select().from(issuesTable).where(and(
        eq(issuesTable.assignedId, userId), isNull(issuesTable.resolvedAt)
    )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const resolvedQuery = await db.select().from(issuesTable).where(and(
        eq(issuesTable.assignedId, userId),
        isNotNull(issuesTable.resolvedAt)
    )).innerJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);;

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

export const getIssue = cache(async (userId: string, issueId: number) => {
    "use server";

    const issues = await db.select().from(issuesTable).where(
        and(
            eq(issuesTable.id, issueId),
            or(
                eq(issuesTable.assignedId, userId), eq(issuesTable.ownerId, userId)
            ),
        ));

    let assignedUser = null;
    if (issues.length > 0 && issues[0].assignedId) {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, issues[0].assignedId));
        assignedUser = user[0];
    }

    const issue = {
        ...issues[0],
        assignedUser: assignedUser
    }

    return issue

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
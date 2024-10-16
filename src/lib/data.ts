import { cache, redirect } from "@solidjs/router";
import { db, getIssueFromDb, getIssuesFromDb, IssueRow, issuesTable, notificationsTable, UserRow, usersTable } from "./db";
import { and, eq, sql } from "drizzle-orm";
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

    const unresolved = await getIssuesFromDb({
        userId: authObject.userId,
        date,
        resolved: false
    });

    const resolved = await getIssuesFromDb({
        userId: authObject.userId,
        date,
        resolved: true
    });

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

    const unresolved = await getIssuesFromDb({
        userId: authObject.userId,
        date,
        resolved: false,
        assigned: true
    });

    const resolved = await getIssuesFromDb({
        userId: authObject.userId,
        date,
        resolved: true,
        assigned: true
    });

    return {
        unresolved,
        resolved
    };

}, "get-all-assigned-issues");

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

export const getIssuesGraphData = cache(async () => {
    "use server";

    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const issuesResolvedPerDay = await db
        .select({
            resolvedAt: sql`DATE(${issuesTable.resolvedAt})`,
            issuesResolved: sql`COUNT(*)`
        })
        .from(issuesTable)
        .where(and(
            sql`${issuesTable.resolvedAt} IS NOT NULL`,
            eq(issuesTable.ownerId, authObject.userId)
        ))
        .groupBy(sql`DATE(${issuesTable.resolvedAt})`)
        .orderBy(sql`resolvedAt ASC`)
        .limit(10) as { resolvedAt: string, issuesResolved: number }[];

    const issuesCreatedPerDay = await db
        .select({
            createdAt: sql`DATE(${issuesTable.createdAt})`,
            createdCount: sql`COUNT(*)`
        })
        .from(issuesTable)
        .where(and(
            eq(issuesTable.ownerId, authObject.userId)
        ))
        .groupBy(sql`DATE(${issuesTable.createdAt})`)
        .orderBy(sql`${issuesTable.createdAt} ASC`)
        .limit(10) as { createdAt: string, createdCount: number }[];

    return {
        issuesResolvedPerDay: {
            labels: issuesResolvedPerDay.map(row => row.resolvedAt),
            data: issuesResolvedPerDay.map(row => row.issuesResolved)
        },
        issuesCreatedPerDay: {
            labels: issuesCreatedPerDay.map(row => row.createdAt),
            data: issuesCreatedPerDay.map(row => row.createdCount)
        },
    };

}, 'get-issues-graph-data')
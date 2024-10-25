import { cache, redirect } from "@solidjs/router";
import { db, getIssueFromDb, IssueRow, issuesTable, notificationsTable, UserRow, usersTable } from "./db";
import { and, eq, or, sql } from "drizzle-orm";
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

    const query = await db.select().from(issuesTable).where(and(
        ...(date ? [eq(sql`DATE(${issuesTable.createdAt})`, date)] : []),
        or(
            eq(issuesTable.assignedId, authObject.userId),
            eq(issuesTable.ownerId, authObject.userId)
        )
    )).leftJoin(usersTable, eq(usersTable.id, issuesTable.assignedId))
        .orderBy(sql`${issuesTable.createdAt} desc`);

    const issuesWithAssignedUser = query.map(query => ({
        ...query.issues,
        assignedUser: query.users
    }));

    return issuesWithAssignedUser;

}, "get-all-user-issues");

export const getIssue = cache(async (issueId: number) => {
    "use server";

    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const issue = await getIssueFromDb(authObject.userId, issueId);

    if (!issue) {
        throw new Error('Could not find issue');
    }

    let assignedUser = null;
    if (issue.assignedId) {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, issue.assignedId));
        assignedUser = user[0];
    }

    let code = null;
    if (issue.stacktrace) {
        code = await codeToHtml(issue.stacktrace, {
            lang: "jsx",
            theme: "material-theme-ocean",
        });
    }

    const issueToReturn = {
        ...issue,
        assignedUser: assignedUser,
        code
    }

    return issueToReturn

}, "get-issue");

export const getUsers = cache(async () => {
    "use server";

    const users = await db.select().from(usersTable);

    return users;

}, "get-users");

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

    const totalIssuesResolved = await db
        .select({
            resolvedCount: sql`COUNT(*)`
        })
        .from(issuesTable)
        .where(and(
            eq(issuesTable.ownerId, authObject.userId),
            sql`${issuesTable.resolvedAt} IS NOT NULL`
        )) as { resolvedCount: number }[];

    const issuesResolvedToday = await db
        .select({
            resolvedCount: sql`COUNT(*)`
        })
        .from(issuesTable)
        .where(and(
            eq(issuesTable.ownerId, authObject.userId),
            sql`DATE(${issuesTable.resolvedAt}) = DATE('now')`
        )) as { resolvedCount: number }[];


    const issuesResolvedYesterday = await db
        .select({
            resolvedCount: sql`COUNT(*)`
        })
        .from(issuesTable)
        .where(and(
            eq(issuesTable.ownerId, authObject.userId),
            sql`DATE(${issuesTable.resolvedAt}) = DATE('now','-1 day')`
        )) as { resolvedCount: number }[];

    return {
        numbers: {
            totalIssuesResolved: totalIssuesResolved[0].resolvedCount,
            issuesResolvedToday: issuesResolvedToday[0].resolvedCount,
            issuesResolvedYesterday: issuesResolvedYesterday[0].resolvedCount,
        },
        issuesCreatedPerDay: {
            labels: issuesCreatedPerDay.map(row => row.createdAt),
            data: issuesCreatedPerDay.map(row => row.createdCount)
        },
    };

}, 'get-issues-graph-data')

export type PossibleNumbers = {
    totalIssuesResolved: number
    issuesResolvedToday: number
    issuesResolvedYesterday: number;
}
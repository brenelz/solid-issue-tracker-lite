import { action, cache, json } from "@solidjs/router";
import { db, issuesTable } from "./db";
import { auth } from "clerk-solidjs/server";
import { and, eq, or } from "drizzle-orm";

export const getAllUserIssues = cache(async (userId: string) => {
    "use server";

    const issues = await db.select().from(issuesTable).where(eq(issuesTable.ownerId, userId))
    return issues;

}, "get-all-user-issues");

export const getAllAssignedIssues = cache(async (userId: string) => {
    "use server";

    const issues = await db.select().from(issuesTable).where(eq(issuesTable.assignedId, userId))
    return issues;

}, "get-all-user-issues");

export const getIssue = cache(async (userId: string, issueId: number) => {
    "use server";

    const issues = await db.select().from(issuesTable).where(
        and(
            eq(issuesTable.id, issueId),
            or(
                eq(issuesTable.assignedId, userId), eq(issuesTable.ownerId, userId)
            ),
        ));
    return issues;

}, "get-all-user-issues");


export const generateFakeIssues = action(async () => {
    "use server";
    const user = auth();

    await db.insert(issuesTable).values({
        ownerId: String(user.userId),
        assignedId: String(user.userId),
        parentIssueId: null,
        title: 'Cannot login to the system',
        description: 'Users are unable to log in after the recent deployment. The login button becomes unresponsive.',
        stacktrace: 'Error: Uncaught TypeError: Cannot read properties of undefined (reading "user") at LoginPage.js:45:12',
        resolvedAt: null
    });

    return json({ success: true })

}, "generate-fake-issues");
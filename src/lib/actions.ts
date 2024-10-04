import { action, json } from "@solidjs/router";
import { db, issuesTable } from "./db";
import { auth } from "clerk-solidjs/server";
import { eq, inArray, sql } from "drizzle-orm";

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

export const resolveIssues = action(async (issueIds: number[]) => {
    "use server";

    await db.update(issuesTable).set({ resolvedAt: sql`datetime('now')` }).where(inArray(issuesTable.id, issueIds))

    return json({ success: true })

}, "resolve-issues");

export const unresolveIssues = action(async (issueIds: number[]) => {
    "use server";

    await db.update(issuesTable).set({ resolvedAt: sql`NULL` }).where(inArray(issuesTable.id, issueIds))

    return json({ success: true })

}, "unresolve-issues");

export const assignIssueTo = action(async (issueId: number, id: string) => {
    "use server";

    await db.update(issuesTable).set({ assignedId: id }).where(eq(issuesTable.id, issueId))

    return json({ success: true })

}, "assign-issue-to");
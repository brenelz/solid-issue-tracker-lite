import { action, json } from "@solidjs/router";
import { db, issuesTable } from "./db";
import { auth } from "clerk-solidjs/server";
import { eq, inArray, sql } from "drizzle-orm";
import { fakeIssues } from "./fakeIssues";

export const generateFakeIssues = action(async () => {
    "use server";
    const user = auth();

    for (let i = 0; i < 10; i++) {
        const fakeIssue = fakeIssues[Math.floor(Math.random() * fakeIssues.length)];

        await db.insert(issuesTable).values({
            ownerId: String(user.userId),
            assignedId: null,
            parentIssueId: null,
            title: fakeIssue.title,
            description: fakeIssue.description,
            stacktrace: fakeIssue.stacktrace,
            resolvedAt: null
        });
    }

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
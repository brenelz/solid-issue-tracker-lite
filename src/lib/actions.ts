import { action, json, redirect } from "@solidjs/router";
import { db, issuesTable } from "./db";
import { auth } from "clerk-solidjs/server";
import { eq, inArray, sql } from "drizzle-orm";
import { fakeIssues } from "./fakeIssues";
import { getAllAssignedIssues, getAllUserIssues, getIssue } from "./data";
import { Liveblocks } from "@liveblocks/node";

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

    return json({ success: true }, { revalidate: [getIssue.key, getAllAssignedIssues.key, getAllUserIssues.key] })

}, "resolve-issues");

export const unresolveIssues = action(async (issueIds: number[]) => {
    "use server";

    await db.update(issuesTable).set({ resolvedAt: sql`NULL` }).where(inArray(issuesTable.id, issueIds))

    return json({ success: true }, { revalidate: [getIssue.key, getAllAssignedIssues.key, getAllUserIssues.key] })

}, "unresolve-issues");

export const assignIssueTo = action(async (issueId: number, id: string) => {
    "use server";
    await db.update(issuesTable).set({ assignedId: id }).where(eq(issuesTable.id, issueId));

    // trigger notification
    const liveblocks = new Liveblocks({
        secret: process.env.LIVEBLOCKS_SECRET_KEY!,
    });

    await liveblocks.triggerInboxNotification({
        // The ID of the user that will receive the inbox notification
        userId: id,

        // The custom notification kind, must start with a $
        kind: "$assignedTo",

        // Custom ID for this specific notification
        subjectId: "assignedTo",

        // Custom data related to the activity that you need to render the inbox notification
        activityData: {
            title: "You've been assigned to:",
            description: "Dashboard not loading data",
            issueId,
        },
    });


    return json({ success: true }, { revalidate: [getIssue.key, getAllAssignedIssues.key, getAllUserIssues.key] })

}, "assign-issue-to");
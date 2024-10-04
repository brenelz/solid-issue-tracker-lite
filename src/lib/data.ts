import { cache } from "@solidjs/router";
import { db, issuesTable } from "./db";
import { and, eq, isNotNull, isNull, or } from "drizzle-orm";

export const getAllUserIssues = cache(async (userId: string) => {
    "use server";

    const unresolved = await db.select().from(issuesTable).where(and(
        eq(issuesTable.ownerId, userId),
        isNull(issuesTable.resolvedAt)
    ));

    const resolved = await db.select().from(issuesTable).where(and(
        eq(issuesTable.ownerId, userId),
        isNotNull(issuesTable.resolvedAt)
    ));

    return {
        unresolved,
        resolved
    };

}, "get-all-user-issues");

export const getAllAssignedIssues = cache(async (userId: string) => {
    "use server";

    const unresolved = await db.select().from(issuesTable).where(and(
        eq(issuesTable.assignedId, userId), isNull(issuesTable.resolvedAt)
    ));

    const resolved = await db.select().from(issuesTable).where(and(
        eq(issuesTable.assignedId, userId),
        isNotNull(issuesTable.resolvedAt)
    ));

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

    return issues[0];

}, "get-issue");
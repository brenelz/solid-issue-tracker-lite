import { action, json, redirect, revalidate } from "@solidjs/router";
import { db, issuesTable, notificationsTable, UserRow } from "./db";
import { auth } from "clerk-solidjs/server";
import { eq, inArray, sql } from "drizzle-orm";
import { fakeIssues } from "./fakeIssues";
import { getAllUserIssues, getIssue, getNotificationsForUser } from "./queries";

export const generateFakeIssues = action(async () => {
    "use server";
    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    for (let i = 0; i < 10; i++) {
        const fakeIssue = fakeIssues[Math.floor(Math.random() * fakeIssues.length)];

        await db.insert(issuesTable).values({
            ownerId: authObject.userId,
            assignedId: null,
            parentIssueId: null,
            title: fakeIssue.title,
            description: fakeIssue.description,
            stacktrace: fakeIssue.stacktrace,
            resolvedAt: null
        });
    }

    return json({ success: true }, { revalidate: [getAllUserIssues.keyFor(undefined)] })

});

export const addNewIssue = action(async (formData: FormData) => {
    "use server";
    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    const title = String(formData.get('title'));
    const description = String(formData.get('description'));
    const priority = String(formData.get('priority') || 'low');
    const assignedId = String(formData.get('assignedId'));

    await db.insert(issuesTable).values({
        ownerId: authObject.userId,
        assignedId,
        parentIssueId: null,
        title,
        description,
        stacktrace: '',
        resolvedAt: null,
        priority,
    });

    return json({ success: true }, { revalidate: [getAllUserIssues.keyFor(undefined)] })

});

export const resolveIssues = action(async (issueIds: number[]) => {
    "use server";

    const issues = await db.update(issuesTable).set({ resolvedAt: sql`datetime('now')` }).where(inArray(issuesTable.id, issueIds)).returning();

    // return json({ success: true, issues }, { revalidate: "nothing" });
    return json({ success: true, issues });
}
    // , {
    //     onComplete: (submission) => {
    //         const [issueIds] = submission.input;

    //         // list page
    //         try {
    //             const getAllUserIssuesKey = getAllUserIssues.keyFor(undefined);
    //             const userIssues: Awaited<ReturnType<typeof getAllUserIssues>> = query.get(getAllUserIssuesKey);
    //             query.set(getAllUserIssuesKey, userIssues.map(issue => {
    //                 if (issueIds.includes(issue.id)) {
    //                     // @ts-expect-error
    //                     const newIssue = submission.result?.issues.find(i => i.id === issue.id);
    //                     return { ...issue, resolvedAt: newIssue.resolvedAt };
    //                 }
    //                 return issue;
    //             }));
    //             revalidate(getAllUserIssuesKey, false);
    //         } catch { }

    //         // detail pages
    //         issueIds.forEach(issueId => {
    //             try {
    //                 const issueKey = getIssue.keyFor(issueId);
    //                 const issue: Awaited<ReturnType<typeof getIssue>> = query.get(issueKey);
    //                 // @ts-expect-error
    //                 const newIssue = submission.result?.issues.find(i => i.id === issue.id);
    //                 query.set(issueKey, { ...issue, resolvedAt: newIssue.resolvedAt });

    //                 revalidate(issueKey, false);
    //             } catch { }
    //         })
    //     }
    // }
);

export const unresolveIssues = action(async (issueIds: number[]) => {
    "use server";

    await db.update(issuesTable).set({ resolvedAt: sql`NULL` }).where(inArray(issuesTable.id, issueIds));

    // return json({ success: true }, { revalidate: 'nothing' });
    return json({ success: true });
}
    // , {
    //     onComplete: (submission) => {
    //         const [issueIds] = submission.input;

    //         // list page
    //         try {
    //             const getAllUserIssuesKey = getAllUserIssues.keyFor(undefined);
    //             const userIssues: Awaited<ReturnType<typeof getAllUserIssues>> = query.get(getAllUserIssuesKey);
    //             query.set(getAllUserIssuesKey, userIssues.map(issue => {
    //                 if (issueIds.includes(issue.id)) {
    //                     return { ...issue, resolvedAt: null }
    //                 }
    //                 return issue;
    //             }));

    //             revalidate(getAllUserIssuesKey, false);
    //         } catch { }

    //         // detail pages
    //         issueIds.forEach(issueId => {
    //             try {
    //                 const issueKey = getIssue.keyFor(issueId);
    //                 const issue: Awaited<ReturnType<typeof getIssue>> = query.get(issueKey);
    //                 query.set(issueKey, { ...issue, resolvedAt: null });

    //                 revalidate(issueKey, false);
    //             } catch { }
    //         })
    //     }
    // }
);

export const assignIssueTo = action(async (issueId: number, user: UserRow) => {
    "use server";

    await db.update(issuesTable).set({ assignedId: user.id }).where(eq(issuesTable.id, issueId));
    await db.insert(notificationsTable).values({
        userId: String(user.id),
        issueId: String(issueId),
        title: "You've been assigned issue:",
    })

    // return json({ success: true }, { revalidate: "nothing" });
    return json({ success: true });
}
    // , {
    //     onComplete: (submission) => {
    //         const [issueId, user] = submission.input;

    //         // list page
    //         try {
    //             const getAllUserIssuesKey = getAllUserIssues.keyFor(undefined);
    //             const allIssues: Awaited<ReturnType<typeof getAllUserIssues>> = query.get(getAllUserIssuesKey);
    //             query.set(getAllUserIssuesKey, allIssues.map(issue => {
    //                 if (issueId === issue.id) {
    //                     return { ...issue, assignedId: user.id, assignedUser: user }
    //                 }
    //                 return issue;
    //             }));
    //             revalidate(getAllUserIssuesKey, false);
    //         } catch { }

    //         // detail page
    //         try {
    //             const getIssueKey = getIssue.keyFor(issueId);
    //             const issue: Awaited<ReturnType<typeof getIssue>> = query.get(getIssueKey);
    //             query.set(getIssueKey, {
    //                 ...issue,
    //                 assignedId: user.id,
    //                 assignedUser: user
    //             });

    //             revalidate(getIssueKey, false);
    //         } catch { }
    //     }
    // }
);

export const clearNotifications = action(async () => {
    "use server";
    const authObject = auth();

    if (!authObject.userId) {
        return redirect('/');
    }

    await db.delete(notificationsTable).where(eq(notificationsTable.userId, authObject.userId))

    // return json({ success: true }, { revalidate: "nothing" });
    return json({ success: true }, { revalidate: [getNotificationsForUser.keyFor()] });
}
    // , {
    //     onComplete: () => {
    //         const key = getNotificationsForUser.keyFor()
    //         query.set(key, []);
    //         revalidate(key, false);
    //     }
    // }
);

export const setPriority = action(async (issueId: number, priority: string) => {
    "use server";

    await db.update(issuesTable).set({ priority }).where(eq(issuesTable.id, issueId));

    // return json({ success: true }, { revalidate: "nothing" });
    return json({ success: true });
}
    // , {
    //     onComplete: (submission) => {
    //         const [issueId, priority] = submission.input;

    //         // list pages
    //         try {
    //             const getAllUserIssuesKey = getAllUserIssues.keyFor(undefined);
    //             const userIssues: Awaited<ReturnType<typeof getAllUserIssues>> = query.get(getAllUserIssuesKey);
    //             query.set(getAllUserIssuesKey, userIssues.map(issue => {
    //                 if (issue.id === issueId) {
    //                     return { ...issue, priority }
    //                 }
    //                 return issue;
    //             }));

    //             revalidate(getAllUserIssuesKey, false);
    //         } catch { }

    //         // detail page
    //         try {
    //             const getIssueKey = getIssue.keyFor(issueId);
    //             const issue: Awaited<ReturnType<typeof getIssue>> = query.get(getIssueKey);
    //             query.set(getIssueKey, {
    //                 ...issue,
    //                 priority
    //             })
    //             revalidate(getIssueKey, false);
    //         } catch { }
    //     }
    // }
);

export const deleteIssue = action(async (issueId: number) => {
    "use server";

    await db.delete(issuesTable).where(eq(issuesTable.id, issueId));

    return redirect('/dashboard/issues', { revalidate: getAllUserIssues.keyFor(undefined) });
});
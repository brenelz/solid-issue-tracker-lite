import { createAsync, RouteDefinition, useParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Show, Suspense } from "solid-js";
import IssueDetail from "~/components/IssueDetail";
import { getIssue, getUsers, renderCode } from "~/lib/data";

export const route = {
    preload: async ({ params }) => {
        void getUsers();
        const auth = useAuth();
        void getIssue(String(auth.userId()), +params.id);
    }
} satisfies RouteDefinition;

export default function Issues() {
    const params = useParams();
    const auth = useAuth();
    const issue = createAsync(() => getIssue(String(auth.userId()), +params.id));
    const code = createAsync(async () => {
        if (issue()) {
            return renderCode(String(issue()?.stacktrace))
        }
    });

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issue Detail</h2>
            </div>
            <Suspense fallback={<div class="flex items-center gap-2"><div class="font-semibold">Loading Issue...</div></div>}>
                <div class="flex flex-row items-center gap-6 text-left text-sm w-full">
                    <Show when={issue()}>
                        {issue => <IssueDetail issue={issue()} />}
                    </Show>
                </div>
            </Suspense>
            <Suspense fallback={<div class="flex items-center gap-2"><div class="font-semibold">Loading Code...</div></div>}>
                <div innerHTML={code()} />
            </Suspense>
        </>
    );
}

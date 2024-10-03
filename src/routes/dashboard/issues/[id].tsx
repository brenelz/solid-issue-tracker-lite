import { createAsync, useAction, useParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Show } from "solid-js";
import { Button } from "~/components/ui/button";
import { getIssue, resolveIssues } from "~/lib/server";

export default function Issues() {
    const params = useParams();
    const auth = useAuth();
    const issue = createAsync(() => getIssue(String(auth.userId()), +params.id));
    const resolveIssuesAction = useAction(resolveIssues);

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issue Detail</h2>
            </div>
            <Show when={issue()}>
                {issue => (
                    <div>
                        {issue().title} ({issue().resolvedAt})
                        <Button onClick={() => resolveIssuesAction([issue().id])}>Resolve</Button>
                    </div>
                )}
            </Show>
        </>
    );
}

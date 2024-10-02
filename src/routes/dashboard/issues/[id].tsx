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
            <h2>Issue Detail</h2>
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

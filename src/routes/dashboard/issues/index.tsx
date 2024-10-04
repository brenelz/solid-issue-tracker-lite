import { createAsync, RouteDefinition, useAction } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import IssueTabs from "~/components/IssueTabs";
import { Button } from "~/components/ui/button";
import { generateFakeIssues } from "~/lib/actions";
import { getAllUserIssues } from "~/lib/data";

export const route = {
    preload() {
        const auth = useAuth();
        void getAllUserIssues(String(auth.userId()));
    }
} satisfies RouteDefinition;

export default function Issues() {
    const auth = useAuth();
    const issues = createAsync(() => getAllUserIssues(String(auth.userId())));

    const generateFakeIssuesAction = useAction(generateFakeIssues);

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issues</h2>
            </div>

            <Button onClick={generateFakeIssuesAction}>Generate Fake Issues</Button>

            <IssueTabs issues={issues()} />
        </>
    );
}

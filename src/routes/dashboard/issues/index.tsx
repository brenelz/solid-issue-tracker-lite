import { createAsyncStore, RouteDefinition, useAction } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createSignal } from "solid-js";
import { toast } from "solid-sonner";
import IssueTabs from "~/components/IssueTabs";
import { Button } from "~/components/ui/button";
import { generateFakeIssues } from "~/lib/actions";
import { getAllUserIssues, getUsers } from "~/lib/data";

export const route = {
    preload() {
        const auth = useAuth();
        void getAllUserIssues(String(auth.userId()), '');
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Issues() {
    const auth = useAuth();
    const [dateFilter, setDateFilter] = createSignal('');
    const issues = createAsyncStore(() => getAllUserIssues(String(auth.userId()), dateFilter()));
    const generateFakeIssuesAction = useAction(generateFakeIssues);

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issues</h2>
            </div>

            <div>
                <Button onClick={async () => {
                    await generateFakeIssuesAction();
                    toast("Fake issues have been generated")
                }}>Generate Fake Issues</Button>
            </div>

            <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                setDateFilter(date)
            }} />
        </>
    );
}

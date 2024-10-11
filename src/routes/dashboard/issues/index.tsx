import { Title } from "@solidjs/meta";
import { createAsyncStore, RouteDefinition, useAction } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import { toast } from "solid-sonner";
import IssueTabs from "~/components/IssueTabs";
import { Button } from "~/components/ui/button";
import { generateFakeIssues } from "~/lib/actions";
import { getAllUserIssues, getUsers } from "~/lib/data";

export const route = {
    preload() {
        void getAllUserIssues();
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Issues() {
    const [dateFilter, setDateFilter] = createSignal<string>();
    const issues = createAsyncStore(() => getAllUserIssues(dateFilter()));
    const generateFakeIssuesAction = useAction(generateFakeIssues);

    return (
        <>
            <Title>Issues - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issues</h2>
            </div>

            <div>
                <Button onClick={async () => {
                    await generateFakeIssuesAction();
                    toast("Fake issues have been generated")
                }}>Generate Fake Issues</Button>
            </div>

            <Show when={issues()}>
                {issues => (
                    <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                        setDateFilter(date)
                    }} />
                )}
            </Show>
        </>
    );
}

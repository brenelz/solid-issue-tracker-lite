import { Title } from "@solidjs/meta";
import { createAsyncStore, RouteDefinition } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import IssueTabs from "~/components/IssueTabs";
import { getAllAssignedIssues, getUsers } from "~/lib/data";

export const route = {
    preload() {
        void getAllAssignedIssues();
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
    const [dateFilter, setDateFilter] = createSignal<string>();
    const issues = createAsyncStore(() => getAllAssignedIssues(dateFilter()));

    return (
        <>
            <Title>Dashboard - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <h3>Your Assigned Issues</h3>

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

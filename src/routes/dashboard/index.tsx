import { createAsyncStore, RouteDefinition } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createSignal } from "solid-js";
import IssueTabs from "~/components/IssueTabs";
import { getAllAssignedIssues, getUsers } from "~/lib/data";

export const route = {
    preload() {
        const auth = useAuth();
        void getAllAssignedIssues(String(auth.userId()), '');
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
    const auth = useAuth();
    const [dateFilter, setDateFilter] = createSignal('');
    const issues = createAsyncStore(() => getAllAssignedIssues(String(auth.userId()), dateFilter()));

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <h3>Your Assigned Issues</h3>

            <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                setDateFilter(date)
            }} />
        </>
    );
}

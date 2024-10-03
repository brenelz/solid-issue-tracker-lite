import { createAsync } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import IssueTabs from "~/components/IssueTabs";
import { getAllAssignedIssues } from "~/lib/server";

export default function Dashboard() {
    const auth = useAuth();
    const issues = createAsync(() => getAllAssignedIssues(String(auth.userId())));

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <h3>Your Assigned Issues</h3>
            <IssueTabs issues={issues()} />
        </>
    );
}

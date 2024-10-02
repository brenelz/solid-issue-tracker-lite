import { createAsync } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Show } from "solid-js";
import IssuesList from "~/components/IssuesList";
import { getAllAssignedIssues } from "~/lib/server";

export default function Dashboard() {
    const auth = useAuth();
    const issues = createAsync(() => getAllAssignedIssues(String(auth.userId())));

    return (
        <>
            <h2>Dashboard</h2>
            <h3>Your Assigned Issues</h3>
            <Show when={issues()}>
                {issues => (
                    <IssuesList issues={issues()} />
                )}
            </Show>
        </>
    );
}

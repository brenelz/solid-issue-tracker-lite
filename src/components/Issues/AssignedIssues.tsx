import { createAsync } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createEffect, createMemo, createSignal, Show } from "solid-js"
import { getAllUserIssues } from "~/lib/queries";
import IssueTabs from "./IssueTabs";

export default function AssignedIssues() {
    const auth = useAuth();
    const [dateFilter, setDateFilter] = createSignal<string>();

    const issues = createAsync(() => getAllUserIssues(dateFilter()), { deferStream: true });
    const assignedIssues = createMemo(() => {
        if (auth.userId()) {
            return issues()?.filter(issue => issue.assignedId === auth.userId());
        }
    });

    return (
        <Show when={assignedIssues()}>
            {issues => (
                <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                    setDateFilter(date)
                }} />
            )}
        </Show>
    )
}
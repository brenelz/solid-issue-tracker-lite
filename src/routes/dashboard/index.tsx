import { Title } from "@solidjs/meta";
import { createAsync, RouteDefinition } from "@solidjs/router";
import { createSignal, Show, Suspense } from "solid-js";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllUserIssues, getIssuesGraphData, getUsers } from "~/lib/queries";
import Graphs from "~/components/Issues/Graphs";
import { useAuth } from "clerk-solidjs";
import IssueTabs from "~/components/Issues/IssueTabs";

export const route = {
    preload() {
        void getAllUserIssues(undefined);
        void getIssuesGraphData();
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
    const auth = useAuth();
    const [dateFilter, setDateFilter] = createSignal<string>();

    const issues = createAsync(() => getAllUserIssues(dateFilter()));
    const assignedIssues = () => {
        if (auth.userId()) {
            return issues()?.filter(issue => issue.assignedId === auth.userId());
        }
    };

    return (
        <>
            <Title>Dashboard - Solid Issue Tracker Lite - Brenelz</Title>

            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div class="flex gap-4 flex-wrap lg:flex-nowrap">
                <div class="w-full lg:w-2/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Assigned Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback="Loading Issues...">
                                <Show when={assignedIssues()}>
                                    {assignedIssues => (
                                        <IssueTabs issues={assignedIssues()} onDateFilterChange={(date) => { setDateFilter(date) }} />
                                    )}
                                </Show>
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
                <div class="w-full lg:w-1/3">
                    <Suspense>
                        <Graphs />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

import { Title } from "@solidjs/meta";
import { createAsyncStore, RouteDefinition } from "@solidjs/router";
import { createMemo, createSignal, Show } from "solid-js";
import IssueTabs from "~/components/IssueTabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { LineChart } from "~/components/ui/charts";
import { getAllAssignedIssues, getIssuesGraphData } from "~/lib/data";

export const route = {
    preload() {
        void getAllAssignedIssues();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
    const [dateFilter, setDateFilter] = createSignal<string>();
    const issues = createAsyncStore(() => getAllAssignedIssues(dateFilter()));
    const issuesGraphData = createAsyncStore(() => getIssuesGraphData());

    const chartDataResolved = createMemo(() => ({
        labels: issuesGraphData()?.resolved.labels!,
        datasets: [
            {
                label: "Issues Resolved",
                data: issuesGraphData()?.resolved.data!
            }
        ]
    }));

    const chartDataUnResolved = createMemo(() => ({
        labels: issuesGraphData()?.unresolved.labels!,
        datasets: [
            {
                label: "Issues Unresolved",
                data: issuesGraphData()?.unresolved.data!
            }
        ]
    }));

    return (
        <>
            <Title>Dashboard - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div class="grid grid-cols-3 grid-rows-2 gap-4">
                <div class="row-span-2 col-span-2 grow">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Assigned Issues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Show when={issues()}>
                                {issues => (
                                    <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                                        console.log(date)
                                        setDateFilter(date)
                                    }} />
                                )}
                            </Show>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Issues resolved per day</CardTitle>
                        </CardHeader>
                        <CardContent class="h-64 w-[500px] max-w-full">
                            <LineChart data={chartDataResolved()} />
                        </CardContent>
                    </Card></div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Issues unresolved over time</CardTitle>
                        </CardHeader>
                        <CardContent class="h-64 w-[500px] max-w-full">
                            <LineChart data={chartDataUnResolved()} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

import { Title } from "@solidjs/meta";
import { createAsyncStore, RouteDefinition } from "@solidjs/router";
import { createMemo, createSignal, Show } from "solid-js";
import IssueTabs from "~/components/Issues/IssueTabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart } from "~/components/ui/charts";
import { getAllAssignedIssues, getIssuesGraphData, PossibleNumbers } from "~/lib/queries";
import NumberFlow from 'solid-number-flow';
import { Badge } from "~/components/ui/badge";

export const route = {
    preload() {
        void getAllAssignedIssues();
        void getIssuesGraphData();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
    const [dateFilter, setDateFilter] = createSignal<string>();
    const [currentNumber, setCurrentNumber] = createSignal<keyof PossibleNumbers>('totalIssuesResolved');

    const issues = createAsyncStore(() => getAllAssignedIssues(dateFilter()));
    const issuesGraphData = createAsyncStore(() => getIssuesGraphData());

    const chartDataIssuesCreatedPerDay = createMemo(() => ({
        labels: issuesGraphData()?.issuesCreatedPerDay.labels!,
        datasets: [
            {
                label: "Issues created",
                data: issuesGraphData()?.issuesCreatedPerDay.data!
            }
        ]
    }));

    return (
        <>
            <Title>Dashboard - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div class="flex gap-4 flex-wrap lg:flex-nowrap">
                <div class="w-full lg:w-2/3">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Assigned Issues</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Show when={issues()}>
                                    {issues => (
                                        <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                                            setDateFilter(date)
                                        }} />
                                    )}
                                </Show>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div class="w-full lg:w-1/3">
                    <div class="flex gap-4 items-center justify-center">
                        <Show when={issuesGraphData()}>
                            {issuesGraphData => (
                                <Card class="w-full p-4 mb-4">
                                    <div class="flex flex-col items-center mb-4">
                                        <span class="text-base">Issues Resolved</span>
                                        <NumberFlow
                                            class="text-6xl"
                                            value={issuesGraphData().numbers[currentNumber()]}
                                            format={{ notation: 'compact' }}
                                            locales="en-US"
                                        />
                                        <div class="flex items-center gap-2">
                                            <Badge variant={currentNumber() !== 'issuesResolvedToday' ? 'secondary' : 'default'}
                                                onClick={() => {
                                                    setCurrentNumber('issuesResolvedToday')
                                                }}>Today</Badge>
                                            <Badge variant={currentNumber() !== 'issuesResolvedYesterday' ? 'secondary' : 'default'}
                                                onClick={() => {
                                                    setCurrentNumber('issuesResolvedYesterday')
                                                }}>Yesterday</Badge>
                                            <Badge variant={currentNumber() !== 'totalIssuesResolved' ? 'secondary' : 'default'}
                                                onClick={() => {
                                                    setCurrentNumber('totalIssuesResolved')
                                                }}>All-Time</Badge>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </Show>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Issues created per day</CardTitle>
                            </CardHeader>
                            <CardContent class="h-64 w-[500px] max-w-full">
                                <BarChart data={chartDataIssuesCreatedPerDay()} />
                            </CardContent>
                        </Card>
                    </div>
                </div >
            </div >
        </>
    );
}

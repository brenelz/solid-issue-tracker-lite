import { createAsyncStore } from "@solidjs/router";
import { createMemo, createSignal, Show } from "solid-js";
import { getIssuesGraphData, PossibleNumbers } from "~/lib/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NumberFlow from "solid-number-flow";
import { Badge } from "../ui/badge";
import { BarChart } from "../ui/charts";

export default function Graphs() {
    const [currentNumber, setCurrentNumber] = createSignal<keyof PossibleNumbers>('totalIssuesResolved');
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
        </>
    )
}
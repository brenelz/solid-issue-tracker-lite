import { Title } from "@solidjs/meta";
import { RouteDefinition } from "@solidjs/router";
import { Suspense } from "solid-js";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getAllUserIssues, getIssuesGraphData, getUsers } from "~/lib/queries";
import Graphs from "~/components/Issues/Graphs";
import AssignedIssues from "~/components/Issues/AssignedIssues";

export const route = {
    preload() {
        void getAllUserIssues(undefined);
        void getIssuesGraphData();
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Dashboard() {
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
                                <Suspense fallback="Loading Issues...">
                                    <AssignedIssues />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </div>
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

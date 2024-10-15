

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import IssuesList from "./IssuesList";
import { IssueWithAssignedUser } from "~/lib/data";
import { clientOnly } from '@solidjs/start';
import { createEffect, Show } from "solid-js";
import { useSubmission } from "@solidjs/router";
import { resolveIssues } from "~/lib/actions";

const ConfettiExplosion = clientOnly(() => import('../components/ConfettiExplosion'));

type IssueTabsProps = {
    issues: {
        resolved: IssueWithAssignedUser[];
        unresolved: IssueWithAssignedUser[];
    },
    onDateFilterChange: (date: string) => void;
}

export default function IssueTabs(props: IssueTabsProps) {
    const sub = useSubmission(resolveIssues);

    return (
        <Tabs defaultValue="unresolved" >
            <TabsList class="grid w-full grid-cols-2" >
                <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="unresolved">
                <Show when={sub.input && props.issues?.unresolved.length === 0}>
                    <ConfettiExplosion />
                </Show>
                <IssuesList onDateFilterChange={props.onDateFilterChange} issues={props.issues?.unresolved} type="unresolved" />
            </TabsContent>
            <TabsContent value="resolved">
                <IssuesList onDateFilterChange={props.onDateFilterChange} issues={props.issues?.resolved} type="resolved" />
            </TabsContent>
        </Tabs>
    )
}
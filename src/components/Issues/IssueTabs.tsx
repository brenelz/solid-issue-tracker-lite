

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import IssuesList from "./IssuesList";
import { getUsers, IssueWithAssignedUser } from "~/lib/queries";
import { clientOnly } from '@solidjs/start';
import { createEffect, createMemo, Show } from "solid-js";
import { createAsync, useSubmission } from "@solidjs/router";
import { resolveIssues } from "~/lib/actions";

const ConfettiExplosion = clientOnly(() => import('../../components/ConfettiExplosion'));

type IssueTabsProps = {
    issues: IssueWithAssignedUser[]
    onDateFilterChange: (date: string) => void;
}

export default function IssueTabs(props: IssueTabsProps) {
    const users = createAsync(() => getUsers());
    const sub = useSubmission(resolveIssues);

    const resolved = createMemo(() => props.issues.filter(issue => issue.resolvedAt !== null));
    const unresolved = createMemo(() => props.issues.filter(issue => issue.resolvedAt === null));

    return (
        <Tabs defaultValue="unresolved" >
            <TabsList class="grid w-full grid-cols-2" >
                <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="unresolved">
                <Show when={sub.input && unresolved().length === 0}>
                    <ConfettiExplosion />
                </Show>
                <IssuesList users={users()} onDateFilterChange={props.onDateFilterChange} issues={unresolved()} type="unresolved" />
            </TabsContent>
            <TabsContent value="resolved">
                <IssuesList users={users()} onDateFilterChange={props.onDateFilterChange} issues={resolved()} type="resolved" />
            </TabsContent>
        </Tabs>
    )
}
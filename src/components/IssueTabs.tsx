

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Show } from "solid-js";
import IssuesList from "./IssuesList";
import { IssueRow } from "~/lib/db";

type IssueTabsProps = {
    issues?: {
        resolved: IssueRow[];
        unresolved: IssueRow[];
    }
}

export default function IssueTabs(props: IssueTabsProps) {
    return (
        <Tabs defaultValue="unresolved">
            <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="unresolved">
                <Show when={props.issues?.unresolved}>
                    {issues => (
                        <IssuesList issues={issues()} type="unresolved" />
                    )}
                </Show>{ }
            </TabsContent>
            <TabsContent value="resolved">
                <Show when={props.issues?.resolved}>
                    {issues => (
                        <IssuesList issues={issues()} type="resolved" />
                    )}
                </Show>
            </TabsContent>
        </Tabs>
    )
}
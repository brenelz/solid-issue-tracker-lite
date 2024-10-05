

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Show } from "solid-js";
import IssuesList from "./IssuesList";
import { IssueWithAssignedUser } from "~/lib/data";

type IssueTabsProps = {
    issues?: {
        resolved: IssueWithAssignedUser[];
        unresolved: IssueWithAssignedUser[];
    },
    onDateFilterChange: (date: string) => void;
}

export default function IssueTabs(props: IssueTabsProps) {
    return (
        <Tabs defaultValue="unresolved" >
            <TabsList class="grid w-full grid-cols-2" >
                <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="unresolved">
                <Show when={props.issues?.unresolved}>
                    {issues => (
                        <IssuesList onDateFilterChange={props.onDateFilterChange} issues={issues()} type="unresolved" />
                    )}
                </Show>{ }
            </TabsContent>
            <TabsContent value="resolved">
                <Show when={props.issues?.resolved}>
                    {issues => (
                        <IssuesList onDateFilterChange={props.onDateFilterChange} issues={issues()} type="resolved" />
                    )}
                </Show>
            </TabsContent>
        </Tabs>
    )
}
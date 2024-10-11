

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import IssuesList from "./IssuesList";
import { IssueWithAssignedUser } from "~/lib/data";

type IssueTabsProps = {
    issues: {
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
                <IssuesList onDateFilterChange={props.onDateFilterChange} issues={props.issues?.unresolved} type="unresolved" />
            </TabsContent>
            <TabsContent value="resolved">
                <IssuesList onDateFilterChange={props.onDateFilterChange} issues={props.issues?.resolved} type="resolved" />
            </TabsContent>
        </Tabs>
    )
}
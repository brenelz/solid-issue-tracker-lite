import { For, Match, Show, Switch } from "solid-js";
import { cn, timeAgo } from "~/lib/utils";
import { Button } from "../ui/button";
import { useAction, useSubmission } from "@solidjs/router";
import { assignIssueTo, resolveIssues, setPriority, unresolveIssues } from "~/lib/actions";
import Avatar from "../Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IssueWithAssignedUser } from "~/lib/queries";
import { toast } from "solid-sonner";
import { Badge } from "../ui/badge";
import { UserRow } from "~/lib/db";

type IssueDetailsProps = {
    issue: IssueWithAssignedUser
    users?: UserRow[]
}

export default function IssueDetail(props: IssueDetailsProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);
    const assignIssueToAction = useAction(assignIssueTo);
    const setPriorityAction = useAction(setPriority);

    const resolveIssuesSubmission = useSubmission(resolveIssues);
    const unresolveIssuesSubmission = useSubmission(unresolveIssues);
    const assignIssueToSubmission = useSubmission(assignIssueTo);
    const setPrioritySubmission = useSubmission(setPriority);

    return (
        <div class="flex flex-row items-center gap-6 w-full"
            classList={
                { 'opacity-50': resolveIssuesSubmission.pending || unresolveIssuesSubmission.pending || assignIssueToSubmission.pending }
            }>
            <a href={`/dashboard/issues/${props.issue.id}`} class="flex-grow">
                <div>
                    <div class="flex flex-grow w-full flex-col gap-1">
                        <div class="flex items-center">
                            <div class="flex items-center gap-2">
                                <div class="font-semibold">{props.issue.title}</div>
                            </div>
                        </div>
                        <div class="line-clamp-2 text-xs mt-1 text-muted-foreground">
                            {props.issue.description}
                        </div>
                    </div>
                </div>
            </a>
            <div
                class={cn(
                    "text-xs",
                    "text-muted-foreground",
                    "shrink-0"
                )}
            >
                {timeAgo(new Date(String(props.issue.createdAt + ' UTC')))}
            </div>
            <div class="hidden shrink-0 md:block">
                <Popover>
                    <PopoverTrigger>
                        <Switch>
                            <Match when={props.issue.priority === 'low'}>
                                <Badge variant="outline">low priority</Badge>
                            </Match>
                            <Match when={props.issue.priority === 'medium'}>
                                <Badge variant="default">medium priority</Badge>
                            </Match>
                            <Match when={props.issue.priority === 'high'}>
                                <Badge variant="destructive">high priority</Badge>
                            </Match>
                        </Switch>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div class="flex items-center gap-4 justify-center" classList={
                            { 'opacity-50': setPrioritySubmission.pending }
                        }>
                            <Badge variant="outline" onClick={() => {
                                setPriorityAction(props.issue.id, 'low');
                            }}>low</Badge>
                            <Badge variant="default" onClick={() => {
                                setPriorityAction(props.issue.id, 'medium');
                            }}>medium</Badge>
                            <Badge variant="destructive" onClick={() => {
                                setPriorityAction(props.issue.id, 'high');
                            }}>high</Badge>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div class="hidden md:block">
                <Popover>
                    <PopoverTrigger>
                        <Avatar
                            name={String(props.issue.assignedUser?.firstName || 'unknown')}
                            src={props.issue.assignedUser?.avatar || null}
                        />
                    </PopoverTrigger>
                    <PopoverContent >
                        <div class="flex items-center" classList={
                            { 'opacity-50': assignIssueToSubmission.pending }
                        }>
                            <span class="hidden sm:inline-block text-sm mr-6">Assign to:</span>
                            <For each={props.users}>
                                {(user) => (
                                    <Avatar
                                        onClick={async () => {
                                            await assignIssueToAction(props.issue.id, user);
                                            toast(`Issue has been assigned to ${user.firstName}`)
                                        }}
                                        src={user.avatar}
                                        name={String(user.firstName || 'unknown')}
                                    />
                                )}
                            </For>
                        </div>
                    </PopoverContent>
                </Popover>
            </div >
            <div>
                <Show when={props.issue.resolvedAt} fallback={
                    <Button onClick={async () => {
                        await resolveIssuesAction([props.issue.id])
                        toast("Issue has been resolved");
                    }}>Resolve</Button>
                }>
                    <Button onClick={async () => {
                        await unresolveIssuesAction([props.issue.id])
                        toast("Issue has been unresolved");
                    }}>Unresolve</Button>
                </Show>
            </div>
        </div >
    )
}
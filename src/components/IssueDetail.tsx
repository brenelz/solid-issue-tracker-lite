import { For, Show } from "solid-js";
import { cn, timeAgo } from "~/lib/utils";
import { Button } from "./ui/button";
import { createAsync, RouteDefinition, useAction, useSubmission } from "@solidjs/router";
import { assignIssueTo, resolveIssues, unresolveIssues } from "~/lib/actions";
import Avatar from "./Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getUsers, IssueWithAssignedUser } from "~/lib/data";
import { toast } from "solid-sonner";

export const route = {
    preload() {
        void getUsers();
    }
} satisfies RouteDefinition;

type IssueDetailsProps = {
    issue: IssueWithAssignedUser
}

export default function IssueDetail(props: IssueDetailsProps) {
    const users = createAsync(() => getUsers());

    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);
    const assignIssueToAction = useAction(assignIssueTo);

    const resolveIssuesSubmission = useSubmission(resolveIssues);
    const unresolveIssuesSubmission = useSubmission(unresolveIssues);
    const assignIssueToSubmission = useSubmission(assignIssueTo);

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
                )}
            >
                {timeAgo(new Date(String(props.issue.createdAt + ' UTC')))}
            </div>

            <div>
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
                            <For each={users()?.filter(user => user.id !== props.issue.assignedUser?.id)}>
                                {(user) => (
                                    <Avatar
                                        onClick={async () => {
                                            await assignIssueToAction(props.issue.id, user.id!);
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
        </div>
    )
}
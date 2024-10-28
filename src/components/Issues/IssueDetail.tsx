import { Show } from "solid-js";
import { cn, timeAgo } from "~/lib/utils";
import { Button } from "../ui/button";
import { useAction, useSubmission } from "@solidjs/router";
import { assignIssueTo, resolveIssues, unresolveIssues } from "~/lib/actions";
import { IssueWithAssignedUser } from "~/lib/queries";
import { toast } from "solid-sonner";
import { UserRow } from "~/lib/db";
import PriorityBadges from "./PriorityBadges";
import AssignTo from "./AssignTo";

type IssueDetailsProps = {
    issue: IssueWithAssignedUser
    users?: UserRow[]
}

export default function IssueDetail(props: IssueDetailsProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);

    const resolveIssuesSubmission = useSubmission(resolveIssues);
    const unresolveIssuesSubmission = useSubmission(unresolveIssues);
    const assignIssueToSubmission = useSubmission(assignIssueTo);

    return (
        <div class="flex flex-col sm:flex-row flex-start sm:items-center gap-6 w-full"
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
            <a href={`/dashboard/issues/${props.issue.id}`} class={cn("text-xs", "text-muted-foreground", "shrink-0")}>
                {timeAgo(new Date(String(props.issue.createdAt + ' UTC')))}
            </a>
            <div class="hidden shrink-0 sm:flex">
                <PriorityBadges issue={props.issue} />
            </div>
            <div class="hidden md:block">
                <AssignTo issue={props.issue} users={props.users} />
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
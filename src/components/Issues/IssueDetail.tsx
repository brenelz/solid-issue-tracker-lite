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
import { Routes } from "~/RouteManifest";

type IssueDetailsProps = {
    issue: IssueWithAssignedUser;
    users?: UserRow[];
    fullDescription?: boolean;
}

export default function IssueDetail(props: IssueDetailsProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);

    const assignIssueToSubmission = useSubmission(assignIssueTo);

    return (
        <div class="flex flex-col sm:flex-row flex-start sm:items-center gap-6 w-full"
            classList={
                { 'opacity-50': assignIssueToSubmission.pending }
            }>
            <a href={Routes().dashboard.issues.id(props.issue.id).index} class="flex-grow">
                <div>
                    <div class="flex flex-grow w-full flex-col gap-1">
                        <div class="flex items-center">
                            <div class="flex items-center gap-2">
                                <div class="font-semibold">{props.issue.title}</div>
                            </div>
                        </div>
                        <div class="text-xs mt-1 text-muted-foreground" classList={{ 'line-clamp-4': !props.fullDescription }}>
                            {props.issue.description}
                        </div>
                    </div>
                </div>
            </a>
            <a href={Routes().dashboard.issues.id(props.issue.id).index} class={cn("text-xs", "text-muted-foreground", "shrink-0")}>
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
import { Show } from "solid-js";
import { IssueRow } from "~/lib/db";
import { cn, timeAgo } from "~/lib/utils";
import { Button } from "./ui/button";
import { useAction } from "@solidjs/router";
import { resolveIssues, unresolveIssues } from "~/lib/server";

type IssueDetailsProps = {
    issue: IssueRow;
}

export default function IssueDetail(props: IssueDetailsProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);

    return (
        <>
            <div class="flex-grow">
                <div class="flex flex-grow w-full flex-col gap-1">
                    <div class="flex items-center">
                        <div class="flex items-center gap-2">
                            <div class="font-semibold">{props.issue.title}</div>
                        </div>
                        <div
                            class={cn(
                                "ml-auto text-xs",
                                "text-muted-foreground"
                            )}
                        >
                            {timeAgo(new Date(String(props.issue.createdAt)))}
                        </div>
                    </div>
                </div>
                <div class="line-clamp-2 text-xs mt-2 text-muted-foreground">
                    {props.issue.description}
                </div>
            </div>
            <div>
                <Show when={props.issue.resolvedAt} fallback={
                    <Button onClick={() => resolveIssuesAction([props.issue.id])}>Resolve</Button>
                }>
                    <Button onClick={() => unresolveIssuesAction([props.issue.id])}>Unresolve</Button>
                </Show>
            </div>
        </>
    )
}
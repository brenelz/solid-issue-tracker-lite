import { useAction } from "@solidjs/router"
import { Button } from "./ui/button"
import { resolveIssues } from "~/lib/server"
import { Checkbox } from "./ui/checkbox";
import { IssueRow } from "~/lib/db";

type IssueProps = {
    issue: IssueRow;
    toggleSelect: (id: number) => void
}

export default function Issue(props: IssueProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    return (
        <div>
            <Checkbox onClick={() => props.toggleSelect(props.issue.id)} />
            <a href={`/dashboard/issues/${props.issue.id}`}>{props.issue.title} ({props.issue.resolvedAt})</a>
            <Button onClick={() => resolveIssuesAction([props.issue.id])}>Resolve</Button>
        </div>
    )
}
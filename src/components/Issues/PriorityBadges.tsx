import { Match, Switch } from "solid-js";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Badge } from "../ui/badge";
import { useAction, useSubmission } from "@solidjs/router";
import { setPriority } from "~/lib/actions";
import { IssueWithAssignedUser } from "~/lib/queries";
import { toast } from "solid-sonner";

type PriorityBadgesProps = {
    issue: IssueWithAssignedUser;
}

export default function PriorityBadges(props: PriorityBadgesProps) {
    const setPriorityAction = useAction(setPriority);
    const setPrioritySubmission = useSubmission(setPriority);

    return (
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
                    <Badge variant="outline" onClick={async () => {
                        await setPriorityAction(props.issue.id, 'low');
                        toast("Issue priority has been set to low");
                    }}>low</Badge>
                    <Badge variant="default" onClick={async () => {
                        await setPriorityAction(props.issue.id, 'medium');
                        toast("Issue priority has been set to medium");
                    }}>medium</Badge>
                    <Badge variant="destructive" onClick={async () => {
                        await setPriorityAction(props.issue.id, 'high');
                        toast("Issue priority has been set to high");
                    }}>high</Badge>
                </div>
            </PopoverContent>
        </Popover>
    )
}
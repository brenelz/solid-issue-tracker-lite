import { IssueWithAssignedUser } from "~/lib/queries";
import Avatar from "../Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { For } from "solid-js";
import { useAction, useSubmission } from "@solidjs/router";
import { assignIssueTo } from "~/lib/actions";
import { UserRow } from "~/lib/db";
import { toast } from "solid-sonner";

type AssignToProps = {
    issue: IssueWithAssignedUser;
    users?: UserRow[]
}

export default function AssignTo(props: AssignToProps) {
    const assignIssueToAction = useAction(assignIssueTo);
    const assignIssueToSubmission = useSubmission(assignIssueTo);

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar
                    name={String(props.issue.assignedUser?.firstName || 'unknown')}
                    src={props.issue.assignedUser?.avatar || null}
                />
            </PopoverTrigger>
            <PopoverContent>
                <div class="flex items-center" classList={
                    { 'opacity-50': assignIssueToSubmission.pending }
                }>
                    <span class="hidden sm:inline-block text-sm mr-6">Assign to:</span>
                    <div class="flex flex-wrap items-center w-64">
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
                </div>
            </PopoverContent>
        </Popover>
    )
}
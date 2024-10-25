import { Checkbox } from "../ui/checkbox";
import { cn } from "~/lib/utils";
import IssueDetail from "./IssueDetail";
import { IssueWithAssignedUser } from "~/lib/queries";
import { UserRow } from "~/lib/db";

type IssueProps = {
    issue: IssueWithAssignedUser;
    toggleSelect: (id: number) => void;
    checked: boolean;
    users?: UserRow[]
}

export default function IssueLink(props: IssueProps) {
    const handleClick = () => {
        props.toggleSelect(props.issue.id)
    }
    return (
        <>
            <div class={cn(
                "flex flex-row items-center gap-6 rounded-lg border p-3 text-left text-sm transition-all hover:bg-[#8ecae633] w-full",
            )}>
                <div class="hidden sm:block">
                    <Checkbox checked={props.checked} onClick={handleClick} />
                </div>
                <IssueDetail users={props.users} issue={props.issue} />
            </div>
        </>
    )
}
import { Checkbox } from "../ui/checkbox";
import { cn } from "~/lib/utils";
import IssueDetail from "./IssueDetail";
import { IssueWithAssignedUser } from "~/lib/queries";

type IssueProps = {
    issue: IssueWithAssignedUser;
    toggleSelect: (id: number) => void;
    checked: boolean;
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
                <div>
                    <Checkbox checked={props.checked} onClick={handleClick} />
                </div>
                <IssueDetail issue={props.issue} />
            </div>
        </>
    )
}
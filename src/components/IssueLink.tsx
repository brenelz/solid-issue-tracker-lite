import { useNavigate } from "@solidjs/router"
import { Checkbox } from "./ui/checkbox";
import { IssueRow } from "~/lib/db";
import { cn } from "~/lib/utils";
import IssueDetail from "./IssueDetail";

type IssueProps = {
    issue: IssueRow;
    toggleSelect: (id: number) => void;
    checked: boolean;
}

export default function IssueLink(props: IssueProps) {
    const handleClick = (e: Event) => {
        e.stopPropagation();
        props.toggleSelect(props.issue.id)
    }
    return (
        <>
            <a
                href={`/dashboard/issues/${props.issue.id}`}
                class={cn(
                    "flex flex-row items-center gap-6 rounded-lg border p-3 text-left text-sm transition-all hover:bg-[#8ecae633] w-full",
                )}
            >
                <div>
                    <Checkbox checked={props.checked} onClick={handleClick} />
                </div>
                <IssueDetail issue={props.issue} />
            </a>
        </>
    )
}
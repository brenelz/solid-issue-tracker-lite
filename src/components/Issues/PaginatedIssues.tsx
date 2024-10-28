import { IssueWithAssignedUser } from "~/lib/queries";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationItems, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { For } from "solid-js";
import { Checkbox } from "../ui/checkbox";
import IssueDetail from "./IssueDetail";
import { cn, paginate } from "~/lib/utils";
import { UserRow } from "~/lib/db";

type PaginatedIssuesProps = {
    issues: IssueWithAssignedUser[];
    setCurrentPage: (page: number) => void;
    page: number;
    selected: number[];
    toggleSelect: (id: number) => void;
    users?: UserRow[]
}

const ITEMS_PER_PAGE = 25;

export default function PaginatedIssues(props: PaginatedIssuesProps) {
    return (
        <>
            <Pagination
                count={Math.ceil(props.issues!.length / ITEMS_PER_PAGE)}
                fixedItems
                itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
                ellipsisComponent={() => <PaginationEllipsis />}
                class="mb-4"
                onPageChange={(page) => {
                    props.setCurrentPage(page);
                }}
            >
                <PaginationPrevious />
                <PaginationItems />
                <PaginationNext />
            </Pagination>
            <For each={paginate(props.issues!, props.page, ITEMS_PER_PAGE)}>
                {(issue) => (
                    <div class={cn("flex flex-row items-center gap-6 rounded-lg border p-3 text-left text-sm transition-all hover:bg-[#8ecae633] w-full")}>
                        <div class="hidden sm:block">
                            <Checkbox checked={props.selected.includes(issue.id)} onClick={() => props.toggleSelect(issue.id)} />
                        </div>
                        <IssueDetail users={props.users} issue={issue} />
                    </div>
                )}
            </For>
            <Pagination
                count={Math.ceil(props.issues!.length / ITEMS_PER_PAGE)}
                fixedItems
                itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
                ellipsisComponent={() => <PaginationEllipsis />}
                class="mt-4"
                onPageChange={(page) => {
                    props.setCurrentPage(page);
                }}
            >
                <PaginationPrevious />
                <PaginationItems />
                <PaginationNext />
            </Pagination>
        </>
    )
}
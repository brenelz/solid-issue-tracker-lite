import { createSignal, For, Show, Suspense, useTransition } from "solid-js";
import { Button } from "./ui/button";
import { useAction } from "@solidjs/router";
import { resolveIssues, unresolveIssues } from "~/lib/actions";
import IssueLink from "./IssueLink";
import { IssueRow } from "~/lib/db";
import { cn, paginate } from "~/lib/utils";
import IssueDatePicker from "./IssueDatePicker";
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious
} from "~/components/ui/pagination"

type IssuesListProps = {
    issues?: IssueRow[];
    type: 'resolved' | 'unresolved';
    onDateFilterChange: (date: string) => void;
}

const ITEMS_PER_PAGE = 25;

export default function IssuesList(props: IssuesListProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);
    const [selected, setSelected] = createSignal<number[]>([]);
    const [pending, startTransition] = useTransition();
    const [page, setPage] = createSignal(1);

    const toggleSelect = (id: number) => {
        const idExist = selected().find(sel => sel === id);
        if (idExist) {
            setSelected(selected().filter(sel => sel !== id));
        } else {
            setSelected([
                ...selected(),
                id,
            ]);
        }
    };

    const toggleSelectAll = () => {
        if (props.issues && selected().length === 0) {
            setSelected(props.issues.map(issue => issue.id));
        } else {
            setSelected([]);
        }
    }

    return (
        <>
            <div class="flex gap-4 mb-4 mt-4">
                <Button onClick={toggleSelectAll}>{selected().length > 0 ? 'Deselect' : 'Select'} All</Button>
                <div class="ml-auto flex gap-4">
                    <IssueDatePicker onValueChange={(details) => {
                        startTransition(() => {
                            props.onDateFilterChange(details.valueAsString[0]);
                            setPage(1);
                        })
                    }} />
                    <Show when={props.type === 'resolved'} fallback={
                        <Button onClick={() => resolveIssuesAction(selected())}>Resolve Selected</Button>
                    }>
                        <Button onClick={() => unresolveIssuesAction(selected())}>Unresolve Selected</Button>
                    </Show>
                </div>
            </div>
            <Suspense fallback="Loading issues...">
                <div classList={{ 'opacity-50': pending() }}>
                    <div class="mb-2 text-sm">
                        {props.issues?.length || 0} Issues
                    </div>

                    <Show when={props.issues && props.issues.length > 0} fallback={<div class={cn(
                        "flex flex-row items-center gap-6 rounded-lg border p-3 text-left text-sm w-full font-semibold",
                    )}>
                        No issues found
                    </div>}>

                        <Pagination
                            count={Math.ceil(props.issues!.length / ITEMS_PER_PAGE)}
                            fixedItems
                            itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
                            ellipsisComponent={() => <PaginationEllipsis />}
                            class="mb-4"
                            onPageChange={(page) => {
                                setPage(page);
                            }}
                        >
                            <PaginationPrevious />
                            <PaginationItems />
                            <PaginationNext />
                        </Pagination>
                        <For each={paginate(props.issues!, page(), ITEMS_PER_PAGE)}>
                            {(issue) => (
                                <IssueLink issue={issue} checked={selected().includes(issue.id)} toggleSelect={toggleSelect} />
                            )}
                        </For>
                        <Pagination
                            count={Math.ceil(props.issues!.length / ITEMS_PER_PAGE)}
                            fixedItems
                            itemComponent={(props) => <PaginationItem page={props.page}>{props.page}</PaginationItem>}
                            ellipsisComponent={() => <PaginationEllipsis />}
                            class="mt-4"
                            onPageChange={(page) => {
                                setPage(page);
                            }}
                        >
                            <PaginationPrevious />
                            <PaginationItems />
                            <PaginationNext />
                        </Pagination>
                    </Show>
                </div>
            </Suspense>
        </>
    )
}
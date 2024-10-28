import { createMemo, createSignal, Show, Suspense, useTransition } from "solid-js";
import { useSubmissions } from "@solidjs/router";
import { resolveIssues, unresolveIssues } from "~/lib/actions";
import { cn } from "~/lib/utils";
import { IssueWithAssignedUser } from "~/lib/queries";
import { UserRow } from "~/lib/db";
import IssueActionBar from "./IssueActionBar";
import PaginatedIssues from "./PaginatedIssues";

type IssuesListProps = {
    issues: IssueWithAssignedUser[];
    type: 'resolved' | 'unresolved';
    onDateFilterChange: (date: string) => void;
    users?: UserRow[]
}

export default function IssuesList(props: IssuesListProps) {
    const [searchTerm, setSearchTerm] = createSignal('');
    const [page, setPage] = createSignal(1);
    const [selected, setSelected] = createSignal<number[]>([]);

    const [pending] = useTransition();
    const resolveIssuesSubmissions = useSubmissions(resolveIssues);
    const unresolveIssuesSubmissions = useSubmissions(unresolveIssues);

    const filteredIssues = createMemo(() => props.issues?.filter(issue => issue.title?.toLowerCase().includes(searchTerm().toLowerCase())));

    const optimisticIssues = createMemo(() => {
        const resolvingIds = [...resolveIssuesSubmissions.values(), ...unresolveIssuesSubmissions.values()]
            .filter(submission => submission.pending)
            .flatMap(submission => submission.input[0]);
        return filteredIssues().filter(issue => !resolvingIds.includes(issue.id));
    });

    const updateSearchTerm = (term: string) => {
        setSearchTerm(term)
    }

    const resetPagination = () => {
        setPage(1);
    }

    const setCurrentPage = (page: number) => {
        setPage(page);
    }

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
        <Suspense fallback="Loading issues...">
            <div class="gap-4 mb-4 mt-4 hidden md:flex">
                <IssueActionBar
                    issues={optimisticIssues()}
                    toggleSelectAll={toggleSelectAll}
                    selected={selected()}
                    updateSearchTerm={updateSearchTerm}
                    onDateFilterChange={props.onDateFilterChange}
                    resetPagination={resetPagination}
                    type={props.type}
                />
            </div>
            <div classList={{ 'opacity-50': pending() }}>
                <div class="mb-2 text-sm">
                    {optimisticIssues().length || 0} Issues
                </div>

                <Show when={optimisticIssues() && optimisticIssues().length > 0} fallback={
                    <div class={cn("flex flex-row items-center gap-6 rounded-lg border p-3 text-left text-sm w-full font-semibold",)}>
                        No issues found
                    </div>}>
                    <PaginatedIssues
                        issues={optimisticIssues()}
                        setCurrentPage={setCurrentPage}
                        page={page()}
                        selected={selected()}
                        toggleSelect={toggleSelect}
                        users={props.users}
                    />
                </Show>
            </div>
        </Suspense>
    )
}
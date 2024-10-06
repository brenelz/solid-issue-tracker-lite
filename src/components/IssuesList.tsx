import { createSignal, For, Show, Suspense, useTransition } from "solid-js";
import { Button } from "./ui/button";
import { useAction } from "@solidjs/router";
import { resolveIssues, unresolveIssues } from "~/lib/actions";
import IssueLink from "./IssueLink";
import { IssueRow } from "~/lib/db";
import { cn } from "~/lib/utils";
import IssueDatePicker from "./IssueDatePicker";

type IssuesListProps = {
    issues?: IssueRow[];
    type: 'resolved' | 'unresolved';
    onDateFilterChange: (date: string) => void;
}

export default function IssuesList(props: IssuesListProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);
    const [selected, setSelected] = createSignal<number[]>([]);
    const [pending, startTransition] = useTransition();

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
                        <For each={props.issues}>
                            {(issue) => (
                                <IssueLink issue={issue} checked={selected().includes(issue.id)} toggleSelect={toggleSelect} />
                            )}
                        </For>
                    </Show>
                </div>
            </Suspense>
        </>
    )
}
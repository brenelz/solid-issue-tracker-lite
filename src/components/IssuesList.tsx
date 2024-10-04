import { createEffect, createSignal, For, JSXElement, Show } from "solid-js";
import { Button } from "./ui/button";
import { useAction } from "@solidjs/router";
import { resolveIssues, unresolveIssues } from "~/lib/actions";
import IssueLink from "./IssueLink";
import { IssueRow } from "~/lib/db";

type IssuesListProps = {
    issues: IssueRow[];
    type: 'resolved' | 'unresolved';
}

export default function IssuesList(props: IssuesListProps) {
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);
    const [selected, setSelected] = createSignal<number[]>([]);

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
        if (selected().length === 0) {
            setSelected(props.issues.map(issue => issue.id));
        } else {
            setSelected([]);
        }
    }

    return (
        <Show when={props.issues.length > 0} fallback={<p>No issues found</p>}>
            <div class="flex gap-4 mb-4">
                <Button onClick={toggleSelectAll}>{selected().length > 0 ? 'Deselect' : 'Select'} All</Button>
                <Show when={props.type === 'resolved'} fallback={
                    <Button onClick={() => resolveIssuesAction(selected())}>Resolve Selected</Button>
                }>
                    <Button onClick={() => unresolveIssuesAction(selected())}>Unresolve Selected</Button>
                </Show>
            </div>
            <For each={props.issues}>
                {(issue) => (
                    <IssueLink issue={issue} checked={selected().includes(issue.id)} toggleSelect={toggleSelect} />
                )}
            </For>
        </Show>

    )
}
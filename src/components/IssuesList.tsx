import { createSignal, For } from "solid-js";
import { Button } from "./ui/button";
import { useAction } from "@solidjs/router";
import { resolveIssues } from "~/lib/server";
import Issue from "./Issue";
import { IssueRow } from "~/lib/db";

type IssuesListProps = {
    issues: IssueRow[];
}

export default function IssuesList(props: IssuesListProps) {
    const resolveIssuesAction = useAction(resolveIssues);
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

    return (
        <>
            <Button onClick={() => resolveIssuesAction(selected())}>Resolve All</Button>
            <For each={props.issues}>
                {(issue) => (
                    <Issue issue={issue} toggleSelect={toggleSelect} />
                )}
            </For>
        </>
    )
}
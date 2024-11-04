import { Show, useTransition } from "solid-js";
import DatePickerWrapper from "../DatePickerWrapper";
import { Button } from "../ui/button";
import { TextField, TextFieldInput } from "../ui/text-field";
import { IssueWithAssignedUser } from "~/lib/queries";
import { resolveIssues, unresolveIssues } from "~/lib/actions";
import { useAction } from "@solidjs/router";

type IssueActionBarProps = {
    issues: IssueWithAssignedUser[];
    toggleSelectAll: () => void;
    selected: number[];
    updateSearchTerm: (term: string) => void;
    onDateFilterChange: (date: string) => void;
    resetPagination: () => void;
    type: 'resolved' | 'unresolved';
}

export default function IssueActionBar(props: IssueActionBarProps) {
    const [, startTransition] = useTransition();
    const resolveIssuesAction = useAction(resolveIssues);
    const unresolveIssuesAction = useAction(unresolveIssues);

    return (
        <>
            <Button disabled={props.issues?.length === 0} onClick={props.toggleSelectAll}>{props.selected.length > 0 ? 'Deselect' : 'Select'} All</Button>
            <div class="ml-auto flex gap-4">
                <TextField class="w-64 hidden xl:block">
                    <TextFieldInput placeholder="Search" type="text" id="search" name="search" onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        props.updateSearchTerm(target.value)
                    }} />
                </TextField>

                <div class="w-64">
                    <DatePickerWrapper onValueChange={(details) => {
                        startTransition(() => {
                            props.onDateFilterChange(details.valueAsString[0]);
                            props.resetPagination()
                        })
                    }} />
                </div>
                <Show when={props.type === 'resolved'} fallback={
                    <Button disabled={props.issues?.length === 0} onClick={() => resolveIssuesAction(props.selected)}>Resolve Selected</Button>
                }>
                    <Button disabled={props.issues?.length === 0} onClick={() => unresolveIssuesAction(props.selected)}>Unresolve Selected</Button>
                </Show>
            </div>
        </>
    )
}
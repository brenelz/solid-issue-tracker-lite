import { createAsync } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import { getUsers } from "~/lib/queries";
import { TextField, TextFieldInput, TextFieldLabel, TextFieldTextArea } from "../ui/text-field";
import { Select, SelectContent, SelectHiddenSelect, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Avatar from "../Avatar";

export default function AddIssueDialogContent() {
    const [newIssueAssignedId, setNewIssueAssignedId] = createSignal<string | null>(null);

    const users = createAsync(() => getUsers());

    return (
        <>
            <div class="flex flex-col gap-4 mt-4">
                <TextField class="grid w-full items-center gap-2.5">
                    <TextFieldLabel for="title">Title:</TextFieldLabel>
                    <TextFieldInput type="text" id="title" name="title" required />
                </TextField>
                <TextField class="grid w-full items-center gap-2.5">
                    <TextFieldLabel for="description">Description:</TextFieldLabel>
                    <TextFieldTextArea id="description" name="description" required />
                </TextField>

                <TextField class="grid w-full items-center gap-2.5">
                    <TextFieldLabel for="priority">Priority:</TextFieldLabel>
                    <Select
                        id="priority"
                        name="priority"
                        class="w-full"
                        options={["low", "medium", "high"]}
                        defaultValue="low"
                        placeholder="Select a priority"
                        itemComponent={(props) => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
                    >
                        <SelectTrigger aria-label="Priority">
                            <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
                        </SelectTrigger>
                        <SelectContent />
                        <SelectHiddenSelect />
                    </Select>
                </TextField>

                <TextField class="grid w-full items-center gap-2.5">
                    <TextFieldLabel for="assignTo">Assign to:</TextFieldLabel>
                    <input type="hidden" name="assignedId" value={String(newIssueAssignedId())} />
                    <div class="ml-3">
                        <div class="flex items-center">
                            <For each={users()}>
                                {(user) => (
                                    <Avatar
                                        selected={newIssueAssignedId() === user.id}
                                        onClick={async () => {
                                            setNewIssueAssignedId(user.id)
                                        }}
                                        src={user.avatar}
                                        name={String(user.firstName || 'unknown')}
                                    />
                                )}
                            </For>
                        </div>
                    </div>
                </TextField>
            </div>
        </>
    )
}
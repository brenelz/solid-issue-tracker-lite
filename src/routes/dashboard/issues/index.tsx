import { Title } from "@solidjs/meta";
import { createAsync, RouteDefinition, useAction } from "@solidjs/router";
import { createSignal, Show, Suspense } from "solid-js";
import { toast } from "solid-sonner";
import IssueTabs from "~/components/Issues/IssueTabs";
import { Button } from "~/components/ui/button";
import { addNewIssue, generateFakeIssues } from "~/lib/actions";
import { getAllUserIssues, getUsers } from "~/lib/queries";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "~/components/ui/dialog"

import AddIssueDialogContent from "~/components/Issues/AddIssueDialogContent";

export const route = {
    preload() {
        void getAllUserIssues(undefined);
        void getUsers();
    }
} satisfies RouteDefinition;

export default function Issues() {
    const [dateFilter, setDateFilter] = createSignal<string>();
    const [open, setOpen] = createSignal(false);
    const issues = createAsync(() => getAllUserIssues(dateFilter()));

    const generateFakeIssuesAction = useAction(generateFakeIssues);

    return (
        <>
            <Title>Issues - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issues</h2>
            </div>

            <div class="flex gap-4">
                <Dialog open={open()} onOpenChange={setOpen}>
                    <DialogTrigger as={Button<"button">}>Add Issue</DialogTrigger>
                    <DialogContent>
                        <form action={addNewIssue} onSubmit={() => {
                            setOpen(false);
                            toast("Issue has been added successfully")
                        }} method="post">
                            <DialogHeader>
                                <DialogTitle>Add Issue</DialogTitle>
                            </DialogHeader>

                            <AddIssueDialogContent />
                            <DialogFooter>
                                <Button type="submit">Add Issue</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog >
                <Button onClick={async () => {
                    try {
                        await generateFakeIssuesAction();
                        toast("Fake issues have been generated")
                    } catch (e) {
                        if (e instanceof Error) {
                            toast(e.message, {
                                class: "text-red-500"
                            });
                        }
                    }

                }}>Generate Fake Issues</Button>

            </div>

            <Suspense>
                <Show when={issues()}>
                    {issues => (
                        <IssueTabs issues={issues()} onDateFilterChange={(date) => {
                            setDateFilter(date)
                        }} />
                    )}
                </Show>
            </Suspense>
        </>
    );
}

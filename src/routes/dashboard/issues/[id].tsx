import { Title } from "@solidjs/meta";
import { createAsync, RouteDefinition, RouteSectionProps, useAction, useSubmission } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createSignal, ErrorBoundary, Show, Suspense } from "solid-js";
import { toast } from "solid-sonner";
import AiDescription from "~/components/Issues/AiDescription";
import IssueDetail from "~/components/Issues/IssueDetail";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { deleteIssue } from "~/lib/actions";
import { getIssue, getUsers } from "~/lib/queries";

export const route = {
    preload: async ({ params }) => {
        void getUsers();
        void getIssue(+params.id);
    }
} satisfies RouteDefinition;

export default function Issues(props: RouteSectionProps) {
    const auth = useAuth();
    const [showAiDescription, setShowAiDescription] = createSignal(false);
    const issue = createAsync(() => getIssue(+props.params.id), { deferStream: true });
    const users = createAsync(() => getUsers());

    const deleteIssueAction = useAction(deleteIssue);
    const deleteIssueSubmission = useSubmission(deleteIssue);

    return (
        <>
            <Title>Issue Detail - Solid Issue Tracker Lite - Brenelz</Title>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issue Detail</h2>
            </div>
            <ErrorBoundary fallback={<p>An error occurred</p>}>
                <Suspense fallback={<div class="flex items-center gap-2"><div class="font-semibold">Loading Issue...</div></div>}>
                    <div class="flex flex-row items-center gap-6 text-left text-sm w-full">
                        <Show when={issue()}>
                            {issue => <IssueDetail users={users()} issue={issue()} />}
                        </Show>
                    </div>

                    <Accordion multiple={false} collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger class="h-6">
                                <Button class="absolute" onClick={() => setShowAiDescription(true)}>Ask AI</Button>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Suspense fallback={<p class="mt-4">Asking AI...</p>}>
                                    <Show when={showAiDescription()}>
                                        <AiDescription issueId={issue()?.id!} />
                                    </Show>
                                </Suspense>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Show when={issue()?.code}>
                        <div innerHTML={String(issue()?.code)} />
                    </Show>

                    <Show when={issue() && issue()?.ownerId === auth.userId()}>
                        <Button disabled={deleteIssueSubmission.pending} variant="destructive" onClick={async () => {
                            await deleteIssueAction(issue()!.id);
                            toast("Issue deleted successfully");
                        }}>Delete</Button>
                    </Show>
                </Suspense>
            </ErrorBoundary>
        </>
    );
}

import { createAsync, createAsyncStore, RouteDefinition, useParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { createSignal, Show, Suspense } from "solid-js";
import AiDescription from "~/components/AiDescription";
import IssueDetail from "~/components/IssueDetail";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { getIssue, getUsers, renderCode } from "~/lib/data";

export const route = {
    preload: async ({ params }) => {
        void getUsers();
        const auth = useAuth();
        void getIssue(String(auth.userId()), +params.id);
    }
} satisfies RouteDefinition;

export default function Issues() {
    const params = useParams();
    const auth = useAuth();
    const issue = createAsyncStore(() => getIssue(String(auth.userId()), +params.id));
    const code = createAsync(async () => {
        if (issue()) {
            return renderCode(String(issue()?.stacktrace))
        }
    });
    const [showAiDescription, setShowAiDescription] = createSignal(false);

    return (
        <>
            <div class="flex items-center justify-between space-y-2">
                <h2 class="text-3xl font-bold tracking-tight">Issue Detail</h2>
            </div>
            <Suspense fallback={<div class="flex items-center gap-2"><div class="font-semibold">Loading Issue...</div></div>}>
                <div class="flex flex-row items-center gap-6 text-left text-sm w-full">
                    <Show when={issue()}>
                        {issue => <IssueDetail issue={issue()} />}
                    </Show>
                </div>

                <Accordion multiple={false} collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Button onClick={() => setShowAiDescription(true)}>Ask AI</Button>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Suspense fallback="Asking AI...">
                                <Show when={showAiDescription()}>
                                    <AiDescription issueId={issue()?.id!} />
                                </Show>
                            </Suspense>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </Suspense >
            <Suspense fallback={<div class="flex items-center gap-2"><div class="font-semibold">Loading Code...</div></div>}>
                <div innerHTML={code()} />
            </Suspense>
        </>
    );
}

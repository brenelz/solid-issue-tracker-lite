import { createAsync, useAction } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { Button } from "~/components/ui/button";
import { generateFakeIssues, getAllUserIssues } from "~/lib/server";

export default function Issues() {
    const auth = useAuth();
    const issues = createAsync(() => getAllUserIssues(String(auth.userId())))
    const generateFakeIssuesAction = useAction(generateFakeIssues);
    return (
        <>
            <h2>Issues </h2>
            <Button onClick={generateFakeIssuesAction}>Generate Fake Issues</Button>
            {JSON.stringify(issues(), null, 4)}
        </>
    );
}

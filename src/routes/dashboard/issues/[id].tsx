import { createAsync, useParams } from "@solidjs/router";
import { useAuth } from "clerk-solidjs";
import { getIssue } from "~/lib/server";

export default function Issues() {
    const params = useParams();
    const auth = useAuth();
    const issue = createAsync(() => getIssue(String(auth.userId()), +params.id));

    return (
        <>
            <h2>Issue Detail</h2>
            {JSON.stringify(issue(), null, 4)}
        </>
    );
}

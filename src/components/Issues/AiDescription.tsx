import { createAsync } from "@solidjs/router";
import { getAiDescription } from "~/lib/ai";

type AiDescriptionProps = {
    issueId: number
}

export default function AiDescription(props: AiDescriptionProps) {
    const aiDescription = createAsync(() => getAiDescription(props.issueId));
    return (
        <p>
            {aiDescription()}
        </p>
    )
}
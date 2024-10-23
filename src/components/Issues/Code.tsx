import { createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { renderCode } from "~/lib/queries";

type CodeProps = {
    stacktrace?: string | null;
}

export default function Code(props: CodeProps) {
    const code = createAsync(() => renderCode(String(props.stacktrace)));

    return (
        <Show when={props.stacktrace && code()}>
            <div innerHTML={code()} />
        </Show>
    );
}
import { createSignal, onCleanup, onMount } from "solid-js";
import { room } from "~/lib/liveblocks";

export default function Room() {
    const [others, setOthers] = createSignal(room.getOthers());

    onMount(() => {
        const unsubscribeOthers = room.subscribe("others", (updatedOthers) => {
            setOthers(updatedOthers);
        });

        onCleanup(() => {
            unsubscribeOthers();
        });
    })

    return (
        <div>There are {others().length} other user(s) online</div>
    );
}
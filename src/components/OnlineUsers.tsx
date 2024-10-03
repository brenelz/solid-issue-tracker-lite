import { BaseUserMeta, JsonObject, User } from "@liveblocks/client";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import { client } from "~/lib/liveblocks";
import Avatar from "./Avatar";
import { useUser } from "clerk-solidjs";

export default function OnlineUsers() {
    const clerk = useUser();
    const [users, setUsers] = createSignal<User<JsonObject, BaseUserMeta>[]>([]);

    onMount(() => {
        const { room } = client.enterRoom("solid-issue-tracker-lite", {
            initialPresence: {
                name: clerk.user()?.fullName,
                avatar: clerk.user()?.imageUrl
            }
        });

        const unsubscribeOthers = room.subscribe("others", (others) => {
            const othersWithPresence = others.filter((user) => user?.presence);
            setUsers(othersWithPresence);
        });

        onCleanup(() => {
            unsubscribeOthers();
        });
    });

    return (
        <Show when={users().length > 0}>
            <span class="hidden sm:inline-block text-sm text-muted-foreground mr-6 text-[#8ecae6]">Online Users</span>
            <For each={users()}>
                {({ presence }) => (
                    <Avatar src={String(presence!.avatar)} name={String(presence.name)} />
                )}
            </For>
            <hr class="shrink-0 bg-border w-px mx-2 h-6 bg-[#8ecae6]" />
        </Show>
    );
}

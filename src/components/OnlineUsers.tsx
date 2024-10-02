import { BaseUserMeta, JsonObject, User } from "@liveblocks/client";
import { createSignal, For, onCleanup, onMount } from "solid-js";
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
        <>
            <For each={users()}>
                {({ presence }) => (
                    <Avatar src={String(presence!.avatar)} name={String(presence.name)} />
                )}
            </For>
        </>
    );
}

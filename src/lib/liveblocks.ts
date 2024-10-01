import { createClient } from "@liveblocks/client";

const client = createClient({
    publicApiKey: import.meta.env.VITE_LIVEBLOCKS_PUBLISHABLE_KEY,
});

export const { room, leave } = client.enterRoom("solid-issue-tracker-lite");
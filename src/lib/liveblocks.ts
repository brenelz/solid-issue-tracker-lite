import { createClient } from "@liveblocks/client";

export const client = createClient({
    authEndpoint: "/api/liveblocks-auth",
});
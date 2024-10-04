import { Liveblocks } from "@liveblocks/node";
import { auth } from "clerk-solidjs/server";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const handler = async () => {
    const authObject = auth();
    // Start an auth session inside your endpoint
    const session = liveblocks.prepareSession(
        String(authObject.userId),
    );

    session.allow(`solid-issue-tracker-lite`, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    return new Response(body, { status });

}
export const POST = handler;
import { json } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { Webhook } from 'svix';
import { readRawBody } from "vinxi/http";
import { db, usersTable } from "~/lib/db";

const handler = async (event: APIEvent) => {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('You need a WEBHOOK_SECRET in your .env')
    }

    // Get the headers and body
    const headers = event.request.headers
    const payload = await readRawBody(event.nativeEvent);

    // Get the Svix headers for verification
    const svix_id = headers.get('svix-id');
    const svix_timestamp = headers.get('svix-timestamp');
    const svix_signature = headers.get('svix-signature');

    // If there are no Svix headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: any

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If the verification fails, error out and  return error code
    try {
        evt = wh.verify(payload!, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    } catch (err) {
        const error: any = err;
        console.log('Error verifying webhook:', error.message)
        return new Response(error.message);
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console
    const { id } = evt.data
    const eventType = evt.type

    if (eventType === 'user.created') {
        await db.insert(usersTable).values({
            id: evt.data.id,
            username: evt.data.username,
            email: evt.data.email_addresses[0].email_address,
            avatar: evt.data.profile_image_url,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
        })
    }

    return json({ success: true });

}
export const POST = handler;
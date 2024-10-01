import { cache } from "@solidjs/router";
import { db, usersTable } from "./db";
import { eq } from "drizzle-orm";
import { auth } from 'clerk-solidjs/start/server';

export async function myProtectedServerFunction() {
    'use server';
    const { userId } = auth();
    if (!userId) {
        throw new Error('You must be signed in');
    }

    console.log('logged in');
}


export const getUser = cache(async () => {
    "use server";
    const user = await db.select().from(usersTable).where(eq(usersTable.id, "1"));

    return user;

}, "get-users");
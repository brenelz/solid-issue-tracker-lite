import { cache } from "@solidjs/router";
import { db, usersTable } from "./db";
import { eq } from "drizzle-orm";

export const getUser = cache(async() => {
    "use server";
    const user = await db.select().from(usersTable).where(eq(usersTable.id, "1"));

    return user;

}, "get-users");
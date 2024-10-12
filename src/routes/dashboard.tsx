import { Navigate, RouteDefinition } from "@solidjs/router";
import { SignedIn, SignedOut } from "clerk-solidjs";
import { ParentProps } from "solid-js";
import { getNotificationsForUser, getUsers } from "~/lib/data";

export const route = {
    preload() {
        void getUsers();
        void getNotificationsForUser();
    }
} satisfies RouteDefinition;

export default function Dashboard(props: ParentProps) {
    return (
        <>
            <SignedIn>
                {props.children}
            </SignedIn>
            <SignedOut>
                <Navigate href="/" />
            </SignedOut>
        </>
    )
}

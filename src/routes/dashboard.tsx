import { Navigate, RouteDefinition } from "@solidjs/router";
import { SignedOut } from "clerk-solidjs";
import { ParentProps } from "solid-js";
import { getNotificationsForUser, getUsers } from "~/lib/queries";
import { Routes } from "~/RouteManifest";

export const route = {
    preload() {
        void getUsers();
        void getNotificationsForUser();
    }
} satisfies RouteDefinition;

export default function Dashboard(props: ParentProps) {
    return (
        <>
            <SignedOut>
                <Navigate href={Routes().dashboard.index} />
            </SignedOut>
            {props.children}
        </>
    )
}

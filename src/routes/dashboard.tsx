import { Navigate } from "@solidjs/router";
import { SignedIn, SignedOut } from "clerk-solidjs";
import { ParentProps } from "solid-js";

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

import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "clerk-solidjs";
import { ParentProps } from "solid-js";
import OnlineUsers from "~/components/OnlineUsers";

export default function MainLayout(props: ParentProps) {
    return (
        <div>
            <h1><a href="/">Solid Issue Tracker Lite</a></h1>
            <ClerkLoading>
                Loading...
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <OnlineUsers />
                    <UserButton />
                </SignedIn>
            </ClerkLoaded>
            <div>
                {props.children}
            </div>
        </div>
    )
}
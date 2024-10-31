import { ClerkLoaded, SignedIn, UserButton } from "clerk-solidjs";
import { ParentProps, Suspense } from "solid-js";
import { MainNav } from "~/components/MainNav";
import OnlineUsers from "~/components/OnlineUsers";
import styles from '~/components/Avatar.module.css';
import { Toaster } from "solid-sonner";
import { cn } from "~/lib/utils";
import InboxNotifications from "~/components/InboxNotifcations";

export default function MainLayout(props: ParentProps) {
    return (
        <div class="flex-col md:flex">
            <div class="border-b">
                <div class="flex flex-wrap justify-center sm:justify-start sm:h-autos sm:text-left h-24 sm:h-16 px-4 bg-primary text-white sm:items-center pt-4 sm:pt-0">
                    <a href="/" class="font-bold sm:inline-block">Solid Issue Tracker Lite</a>
                    <ClerkLoaded>
                        <SignedIn>
                            <MainNav class="mx-6" />
                            <div class="ml-auto flex items-center space-x-4">
                                <div class="sm:flex items-center hidden">
                                    <OnlineUsers />
                                    <Suspense>
                                        <InboxNotifications />
                                    </Suspense>
                                </div>
                                <div class="flex items-center ">
                                    <div class={cn(styles.avatar_online)}>
                                        <UserButton />
                                    </div>
                                </div>
                            </div>
                        </SignedIn>
                    </ClerkLoaded>
                </div>
            </div>
            <div class="flex-1 space-y-4 p-8 pt-6">
                {props.children}
            </div>
            <Toaster />
        </div >
    )
}
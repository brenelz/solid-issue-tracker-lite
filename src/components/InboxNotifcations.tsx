import { For, Show } from "solid-js";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AiOutlineInbox } from 'solid-icons/ai'
import { createAsync, useAction } from "@solidjs/router";
import { getNotificationsForUser } from "~/lib/queries";
import { timeAgo } from "~/lib/utils";
import { AiOutlineBell } from 'solid-icons/ai'
import { Button } from "./ui/button";
import { clearNotifications } from "~/lib/actions";
import { toast } from "solid-sonner";

export default function InboxNotifications() {
    const inboxNotifications = createAsync(() => getNotificationsForUser());
    const clearNotificationsAction = useAction(clearNotifications);

    return (
        <Popover>
            <PopoverTrigger class="mx-4 relative h-16 outline-0">
                <AiOutlineInbox size={32} />
                <Show when={inboxNotifications() && inboxNotifications()!.length > 0}>
                    <span class="absolute inset-0 object-right-top -mr-6">
                        <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                            {inboxNotifications()?.length}
                        </div>
                    </span>
                </Show>
            </PopoverTrigger>
            <PopoverContent class="w-full">
                <Show when={inboxNotifications() && inboxNotifications()!.length > 0} fallback="No notifications">
                    <For each={inboxNotifications()}>
                        {notification => (
                            <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground items-center">
                                <AiOutlineBell class="mt-px size-5" />
                                <a href={`/dashboard/issues/${notification.issues.id}`} class="space-y-1 focus:outline-none">
                                    <p class="text-sm font-medium leading-none">{notification.notifications.title}</p>
                                    <p class="text-sm text-muted-foreground">{notification.issues.title}</p>
                                    <p class="text-sm text-muted-foreground text-xs">{timeAgo(new Date(String(notification.notifications.createdAt + ' UTC')))}</p>
                                </a>
                            </div>
                        )}
                    </For>
                    <div class="flex justify-end">
                        <Button onClick={async () => {
                            await clearNotificationsAction()
                            toast("Notifications cleared successfully")
                        }}>Clear All</Button>
                    </div>
                </Show>
            </PopoverContent>
        </Popover >
    )
}
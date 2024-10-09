import { createSignal, For, onMount, Show } from "solid-js";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { AiOutlineInbox } from 'solid-icons/ai'
import { client } from "~/lib/liveblocks";

export default function InboxNotifications() {
    const [notificationCount, setNotificationCount] = createSignal<number>();
    const [inboxNotifications, setInboxNotifications] = createSignal<any[]>([]);

    onMount(async () => {
        const { inboxNotifications, requestedAt } =
            await client.getInboxNotifications();
        setInboxNotifications(inboxNotifications);

        const count = await client.getUnreadInboxNotificationsCount();
        setNotificationCount(count);
    });


    return (
        <Popover>
            <PopoverTrigger class="mx-4 relative h-16 outline-0">
                <AiOutlineInbox size={32} />
                <Show when={notificationCount() && notificationCount()! > 0}>
                    <span class="absolute inset-0 object-right-top -mr-6">
                        <div class="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                            {notificationCount()}
                        </div>
                    </span>
                </Show>
            </PopoverTrigger>
            <PopoverContent class="w-full">
                <For each={inboxNotifications()}>
                    {notification => (
                        <div class="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                            <a href={`/dashboard/issues/${notification.activities[0].data.issueId}`} class="space-y-1">
                                <p class="text-sm font-medium leading-none">{notification.activities[0].data.title}</p>
                                <p class="text-sm text-muted-foreground">{notification.activities[0].data.description}</p>
                            </a>
                        </div>
                    )}
                </For>
            </PopoverContent>
        </Popover >
    )
}
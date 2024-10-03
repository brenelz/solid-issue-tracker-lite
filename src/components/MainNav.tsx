import { useLocation } from "@solidjs/router"
import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

export function MainNav(props: ComponentProps<"nav">) {
    const location = useLocation();
    const [, rest] = splitProps(props, ["class"])
    return (
        <nav class={cn("flex items-center space-x-4 lg:space-x-6", props.class)} {...rest}>
            <a
                href="/dashboard/"
                class="text-sm font-medium transition-colors hover:text-white text-[#8ecae6]"
                classList={{ "!text-white": location.pathname === '/dashboard/' }}
            >
                Dashboard
            </a>
            <a
                href="/dashboard/issues"
                class="text-sm font-medium transition-colors hover:text-white text-[#8ecae6]"
                classList={{ "!text-white": location.pathname === '/dashboard/issues' }}
            >
                Issues
            </a>
        </nav >
    )
}
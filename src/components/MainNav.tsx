import { useLocation } from "@solidjs/router"
import { AiOutlineGithub } from "solid-icons/ai";
import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"
import { Routes } from "~/RouteManifest";

export function MainNav(props: ComponentProps<"nav">) {
    const location = useLocation();
    const [, rest] = splitProps(props, ["class"])
    return (
        <nav class={cn("flex items-center space-x-4 lg:space-x-6", props.class)} {...rest}>
            <a href={Routes().dashboard.index} class="text-sm font-medium transition-colors hover:text-white text-secondary" classList={{ "!text-white border-b leading-7": location.pathname === '/dashboard/' }}>
                Dashboard
            </a>
            <a href={Routes().dashboard.issues.index} classList={{ "!text-white border-b leading-7": location.pathname === '/dashboard/issues' }}>
                Issues
            </a>
            <a href="https://github.com/brenelz/solid-issue-tracker-lite" target="_blank" rel="noopener" class="text-sm font-medium transition-colors hover:text-white text-secondary">
                <AiOutlineGithub size={24} />
            </a>
        </nav >
    )
}
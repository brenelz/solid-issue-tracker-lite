# Solid Issue Tracker Lite

This is an example issue tracker project built with [SolidStart](https://start.solidjs.com) for [SolidHack2024](https://hack.solidjs.com/).

https://solid-issue-tracker-lite.brenelz.com/

## Technologies Used

- SolidStart
- TypeScript
- SolidUI / Tailwind
- Drizzle

## Services Used

- Netlify
- Clerk
- Turso
- Liveblocks
- OpenAI

## Quick Links

### Core

- [createEffect](https://github.com/brenelz/solid-issue-tracker-lite/blob/main/src/components/InboxNotifcations.tsx#L16)
- [createMemo](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueTabs.tsx#L22)
- [createResource](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/InboxNotifcations.tsx#L13)
- [createSignal](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssuesList.tsx#L18)
- [&lt;ErrorBoundary&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/issues/%5Bid%5D.tsx#L35)
- [&lt;For&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/InboxNotifcations.tsx#L49)
- [&lt;Show&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L30)
- [&lt;Suspense&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/index.tsx#L45)
- [&lt;Switch&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/PriorityBadges.tsx#L20)
- [classList](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssuesList.tsx#L80)
- [onCleanup](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L24)
- [onMount](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L11)
- [useTransition](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueActionBar.tsx#L20)

### Router

- [&lt;Navigate&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/index.tsx#L13)
- [&lt;Router&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx#L13)
- [action](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/actions.ts#L8)
- [createAsync](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/index.tsx#L22)
- [createAsyncStore](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/Graphs.tsx#L11)
- [query](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/queries.ts#L11)
- [preload](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard.tsx#L8)

### SolidStart

- [app.config.ts](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/app.config.ts)
- [app.tsx](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx)
- [&lt;FileRoutes&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx#L30)
- [clientOnly](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueTabs.tsx#L11)
- ["use server"](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/queries.ts#L11)

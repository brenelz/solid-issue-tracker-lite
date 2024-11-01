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

- [createSignal](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssuesList.tsx#L18)
- [createEffect](https://github.com/brenelz/solid-issue-tracker-lite/blob/main/src/components/InboxNotifcations.tsx#L16)
- [createMemo](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueTabs.tsx#L22)
- [createResource](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/InboxNotifcations.tsx#L13)
- [&lt;For&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/InboxNotifcations.tsx#L49)
- [&lt;Show&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L30)
- [&lt;Switch&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/PriorityBadges.tsx#L20)
- [&lt;ErrorBoundary&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/issues/%5Bid%5D.tsx#L35)
- [&lt;Suspense&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/index.tsx#L45)
- [onCleanup](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L24)
- [onMount](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/OnlineUsers.tsx#L11)
- [useTransition](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueActionBar.tsx#L20)
- [classList](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssuesList.tsx#L80)

### Router

- [&lt;Navigate&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/index.tsx#L13)
- [&lt;Router&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx#L13)
- [preload](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard.tsx#L8)
- [query](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/queries.ts#L11)
- [createAsync](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/routes/dashboard/index.tsx#L22)
- [.latest](https://github.com/brenelz/solid-issue-tracker-lite/blob/b9ad5d5af58fc8e8c08d9db61df2c6339c301cb0/src/components/InboxNotifcations.tsx#L39)
- [createAsyncStore](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/Graphs.tsx#L11)
- [action](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/actions.ts#L8)
- [useAction](https://github.com/brenelz/solid-issue-tracker-lite/blob/b9ad5d5af58fc8e8c08d9db61df2c6339c301cb0/src/components/Issues/AssignTo.tsx#L16)
- [useSubmission](https://github.com/brenelz/solid-issue-tracker-lite/blob/b9ad5d5af58fc8e8c08d9db61df2c6339c301cb0/src/components/Issues/AssignTo.tsx#L17)
- [useSubmissions](https://github.com/brenelz/solid-issue-tracker-lite/blob/b9ad5d5af58fc8e8c08d9db61df2c6339c301cb0/src/components/Issues/IssuesList.tsx#L23)
- [useLocation](https://github.com/brenelz/solid-issue-tracker-lite/blob/b9ad5d5af58fc8e8c08d9db61df2c6339c301cb0/src/components/MainNav.tsx#L9)

### SolidStart

- [app.config.ts](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/app.config.ts)
- [app.tsx](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx)
- [&lt;FileRoutes&gt;](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/app.tsx#L30)
- [clientOnly](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/components/Issues/IssueTabs.tsx#L11)
- ["use server"](https://github.com/brenelz/solid-issue-tracker-lite/blob/64aa568d9bea175a2cb4a588c6a69349290fd14d/src/lib/queries.ts#L11)

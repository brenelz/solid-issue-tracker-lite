import { createMiddleware } from '@solidjs/start/middleware';
import { clerkMiddleware } from 'clerk-solidjs/start/server';
import { csrfProtection, secureRequest } from "shieldwall/start";

export const PROD_CSP = {
    "default-src": ["self"],
    "frame-src": ["self"],
    "script-src": ["self", "unsafe-eval", "unsafe-inline", "https://clerk.solid-issue-tracker-lite.brenelz.com", "blob:"],
    "style-src": ["self", "unsafe-inline"],
    "style-src-elem": ["self", "unsafe-inline"],
    "connect-src": ["self", "https://clerk.solid-issue-tracker-lite.brenelz.com", "wss://api.liveblocks.io/"],
    "img-src": ["self", "https://img.clerk.com", "https://www.gravatar.com"],
    "object-src": [],
};

export const DEV_CSP = {
    "default-src": ["self"],
    "frame-src": ["self"],
    "script-src": ["self", "unsafe-eval", "unsafe-inline", "https://square-ant-40.clerk.accounts.dev", "blob:"],
    "style-src": ["self", "unsafe-inline"],
    "style-src-elem": ["self", "unsafe-inline"],
    "connect-src": ["self", "ws://localhost:*", "https://square-ant-40.clerk.accounts.dev", "wss://api.liveblocks.io/"],
    "img-src": ["self", "https://img.clerk.com", "https://www.gravatar.com"],
    "object-src": ["none"],
};

export default createMiddleware({
    onRequest: [
        clerkMiddleware({
            publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
            secretKey: process.env.CLERK_SECRET_KEY
        }),
        csrfProtection,
        secureRequest({
            csp: {
                prod: {
                    withNonce: true,
                    value: PROD_CSP,
                    cspReportOnly: true,
                    cspBlock: false,
                },
                dev: {
                    withNonce: true,
                    value: DEV_CSP,
                    cspReportOnly: false,
                    cspBlock: true,
                },
            },
        }),
    ]
});
import { createMiddleware } from '@solidjs/start/middleware';
import { clerkMiddleware } from 'clerk-solidjs/start/server';
import { csrfProtection } from "shieldwall/start";

export default createMiddleware({
    onRequest: [
        clerkMiddleware({
            publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
            secretKey: process.env.CLERK_SECRET_KEY
        }),
        csrfProtection,
    ]
});
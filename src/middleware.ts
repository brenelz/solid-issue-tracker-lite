import { createMiddleware } from '@solidjs/start/middleware';

export default createMiddleware({
    onRequest: [
        // clerkMiddleware({
        //     publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
        //     secretKey: process.env.CLERK_SECRET_KEY
        // })
    ]
});
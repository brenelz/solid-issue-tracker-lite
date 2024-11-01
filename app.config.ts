import { defineConfig } from "@solidjs/start/config";
import { SolidStartTypesafeRouterPlugin } from 'solid-start-typesafe-routes-plugin';

export default defineConfig({
    middleware: './src/middleware.ts',
    server: {
        preset: "netlify"
    },
    vite: {
        plugins: [SolidStartTypesafeRouterPlugin()],
    },
});

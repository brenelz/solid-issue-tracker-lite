import { Meta, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ClerkProvider } from "clerk-solidjs";
import MainLayout from "./layouts/MainLayout";

import "@fontsource/inter"
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <ClerkProvider
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
          <MetaProvider>
            <Title>Solid Issue Tracker Lite - Brenelz</Title>
            <Meta name="description" content="Solid Issue Tracker Lite is a demo project built with SolidStart for SolidHack2024." />
            <MainLayout>
              <Suspense>
                {props.children}
              </Suspense>
            </MainLayout>
          </MetaProvider>
        </ClerkProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "@fontsource/inter"
import { ClerkProvider } from "clerk-solidjs";

export default function App() {
  return (
    <Router
      root={props => (
        <ClerkProvider
          publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
        >
          <MetaProvider>
            <Title>Solid Issue Tracker Lite - Brenelz</Title>
            <Suspense>{props.children}</Suspense>
          </MetaProvider>
        </ClerkProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

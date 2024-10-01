import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import "@fontsource/inter"

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>Solid Issue Tracker Lite - Brenelz</Title>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

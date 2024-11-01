import { Navigate } from "@solidjs/router";
import { SignedIn, SignedOut, SignIn } from "clerk-solidjs";
import { Routes } from "~/RouteManifest";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div class="flex justify-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate href={Routes().dashboard.index} />
      </SignedIn>
    </>
  );
}

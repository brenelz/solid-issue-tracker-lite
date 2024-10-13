import { Navigate } from "@solidjs/router";
import { SignedIn, SignedOut, SignIn } from "clerk-solidjs";

export default function Home() {
  return (
    <>
      <SignedOut>
        <div class="flex justify-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate href="/dashboard/" />
      </SignedIn>
    </>
  );
}

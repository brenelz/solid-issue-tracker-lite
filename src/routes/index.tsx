import { Navigate } from "@solidjs/router";
import { SignedIn, SignedOut, SignIn } from "clerk-solidjs";

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <Navigate href="/dashboard" />
      </SignedIn>
    </>
  );
}

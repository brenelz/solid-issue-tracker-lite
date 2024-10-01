import { createAsync } from "@solidjs/router";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "clerk-solidjs";
import { Button } from "~/components/ui/button";
import { getUser, myProtectedServerFunction } from "~/lib/server";

export default function Home() {
  const user = createAsync(() => getUser());
  const { userId } = useAuth();
  // const protectedData = createAsync(() => myProtectedServerFunction())
  return (
    <div>
      <ClerkLoading>
        <p>Loading...</p>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
          <p>Welcome, {userId()}</p>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </ClerkLoaded>
      <Button>Click me</Button>
      <pre>
        {JSON.stringify(user())}
      </pre>
      <pre>
        {/* {JSON.stringify(protectedData())} */}
      </pre>
    </div>
  );
}

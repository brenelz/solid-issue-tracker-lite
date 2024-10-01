import { createAsync } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { getUser } from "~/lib/server";

export default function Home() {
  const user = createAsync(() => getUser())
  return (
    <div>
      <Button>Click me</Button>
      {JSON.stringify(user())}
    </div>
  );
}

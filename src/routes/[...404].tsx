import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
  return (
    <>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <div class="flex items-center justify-between space-y-2">
        <h2 class="text-3xl font-bold tracking-tight">Page Not Found</h2>
      </div>
    </>
  );
}

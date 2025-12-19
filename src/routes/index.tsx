import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="grid h-dvh place-content-center p-4">
      <header className="max-w-xl text-center">
        <h1 className="mb-px font-sans text-2xl font-extrabold">
          Devsantara Kit
        </h1>
        <p className="font-sans text-sm text-neutral-500">
          The blueprint for your next big idea
        </p>
        <code className="mt-4 inline-block rounded-md border bg-muted px-2 py-1 font-mono text-sm text-muted-foreground">
          git@github.com:devsantara/kit.git
        </code>
      </header>
    </main>
  );
}

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="h-dvh gird place-items-center place-content-center p-4">
      <header className="max-w-xl text-center">
        <h1 className="font-bold text-2xl mb-px">Devsantara Kit</h1>
        <p className="text-neutral-500">The blueprint for your next big idea</p>
      </header>
    </main>
  );
}

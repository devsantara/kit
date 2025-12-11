import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="container">
      <h1 className="title">Devsantara Kit</h1>
      <p>The blueprint for your next big idea</p>
    </main>
  );
}

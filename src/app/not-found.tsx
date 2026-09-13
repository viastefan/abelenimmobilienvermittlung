import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NotFoundBody } from "@/components/layout/NotFoundBody";

/**
 * Root 404 — reached for URLs that match no route at all. Route-group
 * layouts do not apply here, so the site chrome is wired up explicitly;
 * without it a mistyped URL left visitors on a bare page with no navigation.
 */
export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <NotFoundBody />
      </main>
      <Footer />
    </div>
  );
}

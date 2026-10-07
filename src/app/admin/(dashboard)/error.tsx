"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CloudOff, LoaderCircle, RotateCw } from "lucide-react";
import { Leer, knopf } from "@/components/admin/ui";

/**
 * Wenn eine Seite der App nicht lädt — fast immer ist es die Verbindung.
 * Der Rahmen der App bleibt stehen, und statt Fachchinesisch steht da, was
 * zu tun ist. Gespeichertes ist davon nie betroffen.
 */
export default function AppFehler({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [laedt, starten] = useTransition();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Leer
      symbol={<CloudOff className="h-6 w-6" strokeWidth={1.8} />}
      titel="Das lädt gerade nicht"
      text="Meist liegt es an der Verbindung. Alles, was Sie gespeichert haben, ist sicher — versuchen Sie es einfach noch einmal."
      aktion={
        <button
          type="button"
          disabled={laedt}
          onClick={() =>
            starten(() => {
              router.refresh();
              reset();
            })
          }
          className={knopf.primaer}
        >
          {laedt ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <RotateCw className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          )}
          Noch einmal versuchen
        </button>
      }
    />
  );
}

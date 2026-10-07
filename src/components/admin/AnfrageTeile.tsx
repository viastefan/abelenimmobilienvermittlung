"use client";

import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Trash2 } from "lucide-react";
import { deleteInquiry, saveInquiryNote, setInquiryStatus } from "@/app/admin/inquiry-actions";
import type { InquiryStatus } from "@/types/inquiry";
import { Bestaetigen } from "./Bestaetigen";
import { Textfeld } from "./Formular";
import { useToast } from "./Toast";
import { Auswahl, klassen, knopf } from "./ui";

const stufen: { value: InquiryStatus; label: string; punkt: string; meldung: string }[] = [
  { value: "neu", label: "Neu", punkt: "bg-accent-deep", meldung: "Wieder als neu markiert." },
  { value: "in-bearbeitung", label: "In Arbeit", punkt: "bg-[#D08A3E]", meldung: "Als „in Arbeit“ markiert." },
  { value: "erledigt", label: "Erledigt", punkt: "bg-text-subtle", meldung: "Als erledigt markiert." },
];

/** Stand der Anfrage — ein Antippen genügt, gespeichert wird sofort. */
export function AnfrageStand({ id, status }: { id: string; status: InquiryStatus }) {
  const [wert, setWert] = useOptimistic(status);
  const [, starten] = useTransition();
  const zeigen = useToast();

  return (
    <Auswahl
      name="stand"
      label="Stand der Anfrage"
      value={wert}
      optionen={stufen}
      onChange={(neu) =>
        starten(async () => {
          setWert(neu);
          try {
            await setInquiryStatus(id, neu);
            zeigen(stufen.find((stufe) => stufe.value === neu)!.meldung);
          } catch {
            zeigen("Das hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal.", "fehler");
          }
        })
      }
    />
  );
}

/**
 * Notiz nur für Silke Abelen. Sie speichert sich selbst — kurz nachdem man
 * aufhört zu tippen und beim Verlassen des Feldes. Einen Knopf dafür
 * vergisst man.
 */
export function AnfrageNotiz({ id, anfangs }: { id: string; anfangs: string }) {
  const [text, setText] = useState(anfangs);
  const [stand, setStand] = useState<"ruhe" | "speichert" | "gespeichert" | "fehler">("ruhe");
  const gesichert = useRef(anfangs);
  const zeitgeber = useRef<number | undefined>(undefined);

  async function sichern(wert: string) {
    window.clearTimeout(zeitgeber.current);
    if (wert.trim() === gesichert.current.trim()) return;
    setStand("speichert");
    try {
      await saveInquiryNote(id, wert);
      gesichert.current = wert;
      setStand("gespeichert");
    } catch {
      setStand("fehler");
    }
  }

  useEffect(() => () => window.clearTimeout(zeitgeber.current), []);

  return (
    <div>
      <Textfeld
        aria-label="Notiz"
        minZeilen={3}
        value={text}
        placeholder="Nur für Sie sichtbar — z. B. „Rückruf am Montag vereinbart“"
        onChange={(event) => {
          const wert = event.target.value;
          setText(wert);
          setStand("ruhe");
          window.clearTimeout(zeitgeber.current);
          zeitgeber.current = window.setTimeout(() => void sichern(wert), 1200);
        }}
        onBlur={() => void sichern(text)}
      />
      <p
        className={klassen(
          "mt-2 flex items-center gap-1.5 text-[0.8125rem]",
          stand === "fehler" ? "text-warning" : stand === "gespeichert" ? "text-success" : "text-text-subtle"
        )}
        aria-live="polite"
      >
        {stand === "gespeichert" && <Check className="h-3.5 w-3.5" strokeWidth={2.6} aria-hidden="true" />}
        {stand === "speichert"
          ? "Wird gespeichert …"
          : stand === "gespeichert"
            ? "Gespeichert"
            : stand === "fehler"
              ? "Nicht gespeichert — bitte tippen Sie noch einmal ins Feld."
              : "Speichert sich von selbst."}
      </p>
    </div>
  );
}

export function AnfrageLoeschen({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const zeigen = useToast();

  return (
    <Bestaetigen
      titel="Anfrage löschen?"
      text={<>Die Anfrage von {name} wird mit Ihrer Notiz gelöscht. Das lässt sich nicht rückgängig machen.</>}
      bestaetigen="Endgültig löschen"
      aktion={async () => {
        await deleteInquiry(id);
        zeigen("Die Anfrage wurde gelöscht.");
        router.push("/admin/anfragen");
      }}
      ausloeser={(oeffnen) => (
        <button type="button" onClick={oeffnen} className={knopf.gefahr}>
          <Trash2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Anfrage löschen
        </button>
      )}
    />
  );
}

import Link from "next/link";
import { House, Inbox, Mail, MapPin, Phone } from "lucide-react";
import type { Inquiry, InquiryStatus } from "@/types/inquiry";
import { site } from "@/data/site";
import { genau } from "@/lib/admin/zeit";
import { AnfrageLoeschen, AnfrageNotiz, AnfrageStand } from "../AnfrageTeile";
import { Karte, Leer, Seitenkopf, klassen, knopf } from "../ui";
import { AnfragenListe } from "./AnfragenListe";

const filter: { wert?: InquiryStatus; label: string }[] = [
  { label: "Alle" },
  { wert: "neu", label: "Neu" },
  { wert: "in-bearbeitung", label: "In Arbeit" },
  { wert: "erledigt", label: "Erledigt" },
];

export function AnfragenAnsicht({ anfragen, stand, jetzt }: { anfragen: Inquiry[]; stand?: InquiryStatus; jetzt: Date }) {
  const neu = anfragen.filter((anfrage) => anfrage.status === "neu").length;
  const sichtbar = stand ? anfragen.filter((anfrage) => anfrage.status === stand) : anfragen;

  return (
    <>
      <Seitenkopf
        titel="Anfragen"
        unterzeile={
          anfragen.length === 0
            ? "Was über das Kontaktformular der Website kommt, landet hier — und zusätzlich in Ihrem Postfach."
            : neu > 0
              ? `${neu === 1 ? "Eine Anfrage wartet" : `${neu} Anfragen warten`} auf Ihre Antwort.`
              : "Alles beantwortet."
        }
      />

      {anfragen.length > 0 && (
        <nav aria-label="Anfragen filtern" className="-mx-4 mb-5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <ul className="inline-flex gap-1 rounded-[15px] bg-white p-1 ring-1 ring-[#E6EBEF]">
            {filter.map((eintrag) => {
              const aktiv = eintrag.wert === stand;
              const anzahl = eintrag.wert ? anfragen.filter((anfrage) => anfrage.status === eintrag.wert).length : anfragen.length;
              return (
                <li key={eintrag.label}>
                  <Link
                    href={eintrag.wert ? `/admin/anfragen?stand=${eintrag.wert}` : "/admin/anfragen"}
                    aria-current={aktiv ? "page" : undefined}
                    className={klassen(
                      "flex items-center gap-2 whitespace-nowrap rounded-[11px] px-3.5 py-2 text-[0.875rem] font-semibold transition-colors duration-200",
                      aktiv ? "bg-ink text-white" : "text-text-muted hover:text-ink"
                    )}
                  >
                    {eintrag.label}
                    <span className={klassen("tabular-nums", aktiv ? "text-white/60" : "text-text-subtle")}>{anzahl}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {sichtbar.length === 0 ? (
        <Leer
          symbol={<Inbox className="h-6 w-6" strokeWidth={1.8} />}
          titel={anfragen.length === 0 ? "Noch keine Anfrage" : "Hier ist gerade nichts"}
          text={
            anfragen.length === 0
              ? "Sobald jemand das Kontaktformular Ihrer Website ausfüllt, steht die Anfrage hier."
              : "In dieser Auswahl liegt keine Anfrage. Oben können Sie eine andere wählen."
          }
        />
      ) : (
        <AnfragenListe anfragen={sichtbar} jetzt={jetzt} />
      )}
    </>
  );
}

function Angabe({ symbol: Symbol, label, children }: { symbol: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5 py-3.5 first:pt-0 last:pb-0">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-surface-cool text-accent-deep">
        <Symbol className="h-[1.0625rem] w-[1.0625rem]" strokeWidth={1.9} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-[0.8125rem] font-medium text-text-subtle">{label}</dt>
        <dd className="mt-0.5 break-words text-[0.9375rem] font-semibold text-ink">{children}</dd>
      </div>
    </div>
  );
}

/**
 * Eine Anfrage, ganz. Oben die beiden Wege zurück zum Absender — Antwort
 * per E-Mail ist schon vorbereitet, mit Betreff und Anrede.
 */
export function AnfrageAnsicht({ anfrage }: { anfrage: Inquiry }) {
  const betreff = `Ihre Anfrage: ${anfrage.interestLabel}${anfrage.objectRef ? ` — ${anfrage.objectRef}` : ""}`;
  const text = `Guten Tag ${anfrage.name},\n\nvielen Dank für Ihre Anfrage.\n\n\n\nMit freundlichen Grüßen\n${site.owner}`;
  const antworten = `mailto:${anfrage.email}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(text)}`;
  const telefon = anfrage.phone.replace(/[^+\d]/g, "");

  return (
    <>
      <Seitenkopf
        zurueck={{ href: "/admin/anfragen", label: "Anfragen" }}
        titel={anfrage.name}
        unterzeile={
          <>
            <span className="font-semibold text-ink">{anfrage.interestLabel}</span>
            <span aria-hidden="true"> · </span>
            {genau(anfrage.createdAt)}
          </>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <a href={antworten} className={knopf.primaer}>
          <Mail className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
          Antworten
        </a>
        {telefon && (
          <a href={`tel:${telefon}`} className={knopf.zweit}>
            <Phone className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
            Anrufen
          </a>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-6">
        <div className="space-y-5 lg:space-y-6">
          <Karte titel="Nachricht">
            <p className="whitespace-pre-line text-[1rem] leading-[1.7] text-text">{anfrage.message}</p>
          </Karte>
          <Karte titel="Stand" beschreibung="Neu, in Arbeit oder erledigt — nur für Ihren Überblick.">
            <AnfrageStand id={anfrage.id} status={anfrage.status} />
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-2 text-[0.875rem] font-semibold text-ink">Notiz</p>
              <AnfrageNotiz id={anfrage.id} anfangs={anfrage.note} />
            </div>
          </Karte>
        </div>

        <Karte titel="Kontakt" className="h-fit">
          <dl className="divide-y divide-border">
            <Angabe symbol={Mail} label="E-Mail">
              <a href={`mailto:${anfrage.email}`} className="text-accent-deep hover:underline">
                {anfrage.email}
              </a>
            </Angabe>
            <Angabe symbol={Phone} label="Telefon">
              {telefon ? (
                <a href={`tel:${telefon}`} className="text-accent-deep hover:underline">
                  {anfrage.phone}
                </a>
              ) : (
                <span className="font-medium text-text-subtle">Nicht angegeben</span>
              )}
            </Angabe>
            {anfrage.objectRef && (
              <Angabe symbol={House} label="Zum Objekt">
                {anfrage.objectRef}
              </Angabe>
            )}
            {anfrage.address && (
              <Angabe symbol={MapPin} label="Adresse der Immobilie">
                {anfrage.address}
              </Angabe>
            )}
          </dl>
        </Karte>
      </div>

      <div className="mt-10 flex justify-center">
        <AnfrageLoeschen id={anfrage.id} name={anfrage.name} />
      </div>
    </>
  );
}

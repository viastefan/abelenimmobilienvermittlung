import Link from "next/link";
import { ArrowRight, Award, Building2, Inbox, Plus } from "lucide-react";
import type { Inquiry } from "@/types/inquiry";
import type { Property } from "@/types/property";
import type { ReferenceObject } from "@/types/reference";
import { site } from "@/data/site";
import { begruessung, heuteLang } from "@/lib/admin/zeit";
import { ObjektKarte } from "../Karten";
import { Abschnitt, KnopfLink, Leer, Seitenkopf } from "../ui";
import { AnfragenListe } from "./AnfragenListe";

function Kennzahl({ href, zahl, text, symbol: Symbol, betont = false }: { href: string; zahl: number; text: string; symbol: typeof Inbox; betont?: boolean }) {
  return (
    <Link
      href={href}
      className="group rounded-[20px] bg-white p-4 shadow-[0_1px_2px_rgba(16,43,78,0.04)] ring-1 ring-[#E6EBEF] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-18px_rgba(16,43,78,0.35)] sm:p-5"
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${betont ? "bg-accent-deep text-white" : "bg-surface-cool text-accent-deep"}`}>
        <Symbol className="h-[1.125rem] w-[1.125rem]" strokeWidth={2} aria-hidden="true" />
      </span>
      <p className="mt-4 font-display text-[1.875rem] font-extrabold leading-none tabular-nums tracking-[-0.03em] text-ink">{zahl}</p>
      <p className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-text-muted">{text}</p>
    </Link>
  );
}

/**
 * Die erste Seite nach der Anmeldung. Sie beantwortet drei Fragen, bevor
 * jemand sie stellt: Wartet jemand auf mich? Was steht gerade online? Wo
 * ändere ich einen Preis? — Antwort auf die dritte: das Objekt antippen.
 */
export function UebersichtAnsicht({
  jetzt,
  objekte,
  referenzen,
  anfragen,
}: {
  jetzt: Date;
  objekte: Property[];
  referenzen: ReferenceObject[];
  anfragen: Inquiry[];
}) {
  const neue = anfragen.filter((anfrage) => anfrage.status === "neu");
  const online = objekte.filter((objekt) => objekt.published);
  const nachname = site.owner.split(/\s+/).at(-1);

  return (
    <>
      <Seitenkopf
        titel={`${begruessung(jetzt)}, Frau ${nachname}`}
        unterzeile={heuteLang(jetzt)}
        aktion={
          <KnopfLink href="/admin/immobilien/neu" className="hidden sm:inline-flex">
            <Plus className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.2} aria-hidden="true" />
            Neues Objekt
          </KnopfLink>
        }
      />

      {neue.length > 0 && (
        <Link
          href={neue.length === 1 ? `/admin/anfragen/${neue[0]!.id}` : "/admin/anfragen?stand=neu"}
          className="group relative mb-6 flex items-center gap-4 overflow-hidden rounded-[22px] bg-ink-deep p-5 text-white shadow-[0_18px_40px_-20px_rgba(11,37,69,0.6)] transition-transform duration-300 ease-smooth hover:-translate-y-0.5 sm:p-6"
        >
          <span className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-white/10 ring-1 ring-white/15">
            <Inbox className="h-5 w-5 text-accent" strokeWidth={2} aria-hidden="true" />
            <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-accent ring-[3px] ring-ink-deep" aria-hidden="true" />
          </span>
          <span className="relative min-w-0 flex-1">
            <span className="block font-display text-[1.0625rem] font-bold tracking-[-0.01em]">
              {neue.length === 1 ? "Eine neue Anfrage wartet auf Sie" : `${neue.length} neue Anfragen warten auf Sie`}
            </span>
            <span className="mt-0.5 block truncate text-[0.875rem] text-white/70">
              {neue.length === 1 ? `${neue[0]!.name} · ${neue[0]!.interestLabel}` : neue.map((anfrage) => anfrage.firstName).join(", ")}
            </span>
          </span>
          <ArrowRight className="relative h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-1" strokeWidth={2} aria-hidden="true" />
        </Link>
      )}

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Kennzahl href="/admin/immobilien" zahl={online.length} text={online.length === 1 ? "Objekt online" : "Objekte online"} symbol={Building2} />
        <Kennzahl href="/admin/anfragen" zahl={neue.length} text={neue.length === 1 ? "neue Anfrage" : "neue Anfragen"} symbol={Inbox} betont={neue.length > 0} />
        <Kennzahl
          href="/admin/referenzen"
          zahl={referenzen.filter((referenz) => referenz.published).length}
          text={referenzen.filter((referenz) => referenz.published).length === 1 ? "Referenz" : "Referenzen"}
          symbol={Award}
        />
      </div>

      <div className="mt-10">
        <Abschnitt titel="Ihre Objekte" mehr={objekte.length > 3 ? { href: "/admin/immobilien", label: "Alle ansehen" } : undefined}>
          {objekte.length === 0 ? (
            <Leer
              symbol={<Building2 className="h-6 w-6" strokeWidth={1.8} />}
              titel="Noch kein Objekt"
              text="Legen Sie Ihr erstes Objekt an. Sobald Sie es online stellen, erscheint es auf der Website."
              aktion={
                <KnopfLink href="/admin/immobilien/neu">
                  <Plus className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.2} aria-hidden="true" />
                  Objekt anlegen
                </KnopfLink>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {objekte.slice(0, 3).map((objekt, index) => (
                <ObjektKarte key={objekt.id} objekt={objekt} erstes={index === 0} letztes={index === objekte.length - 1} />
              ))}
            </div>
          )}
        </Abschnitt>

        {anfragen.length > 0 && (
          <Abschnitt titel="Neueste Anfragen" mehr={{ href: "/admin/anfragen", label: "Alle ansehen" }}>
            <AnfragenListe anfragen={anfragen.slice(0, 4)} jetzt={jetzt} />
          </Abschnitt>
        )}
      </div>

      <Link
        href="/admin/immobilien/neu"
        aria-label="Neues Objekt"
        className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_12px_28px_-8px_rgba(11,37,69,0.55)] transition-transform duration-200 active:scale-95 sm:hidden"
      >
        <Plus className="h-6 w-6" strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </>
  );
}

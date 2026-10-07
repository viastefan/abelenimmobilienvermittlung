"use client";

import Image from "next/image";
import Link from "next/link";
import { useOptimistic, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Globe, ImageOff, Pencil, Star, Trash2 } from "lucide-react";
import { lokalesBild } from "@/data/wix-media";
import type { Property } from "@/types/property";
import type { ReferenceObject } from "@/types/reference";
import {
  objektHervorheben,
  objektLoeschen,
  objektOnline,
  objektVerschieben,
} from "@/app/admin/actions";
import { referenzLoeschen, referenzOnline, referenzVerschieben } from "@/app/admin/reference-actions";
import { useRueckfrage } from "./Bestaetigen";
import { Menue, type MenuePunkt } from "./Menue";
import { useToast } from "./Toast";
import { OnlineChip, StatusChip, klassen } from "./ui";

/**
 * Eine Karte je Objekt: Foto, Name, Ort, Preis. Antippen öffnet es. Alles
 * andere — online stellen, hervorheben, Reihenfolge, löschen — liegt im
 * Menü am Foto, damit die Übersicht ein Blick auf die Objekte bleibt und
 * kein Schaltpult wird.
 */
function Karteikarte({
  href,
  bild,
  titel,
  ort,
  wert,
  oben,
  unten,
  online,
  menue,
}: {
  href: string;
  bild?: string;
  titel: string;
  ort: string;
  wert?: string;
  oben?: ReactNode;
  unten?: ReactNode;
  online: boolean;
  menue: ReactNode;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(16,43,78,0.04)] ring-1 ring-[#E6EBEF] transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(16,43,78,0.35)]">
      <Link href={href} className="block focus-visible:outline-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-mist">
          {bild ? (
            <Image
              src={lokalesBild(bild)}
              alt=""
              fill
              sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
            />
          ) : (
            <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-text-subtle">
              <ImageOff className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              <span className="text-[0.8125rem] font-medium">Noch kein Foto</span>
            </span>
          )}
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
          {oben && <span className="absolute left-3 top-3 flex gap-1.5">{oben}</span>}
          {unten && <span className="absolute bottom-3 left-3">{unten}</span>}
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="line-clamp-2 font-display sm:min-h-[2lh] text-[1.0625rem] font-bold leading-snug tracking-[-0.012em] text-ink">
            {titel}
          </h3>
          <p className="mt-1 truncate text-[0.875rem] text-text-muted">{ort}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            {wert ? (
              <p className="font-display text-[1.25rem] font-extrabold tabular-nums tracking-[-0.02em] text-ink">{wert}</p>
            ) : (
              <span />
            )}
            <OnlineChip online={online} />
          </div>
        </div>
      </Link>
      <div className="absolute right-3 top-3">{menue}</div>
    </article>
  );
}

function Hinweis({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={klassen(
        "inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[0.75rem] font-bold text-ink shadow-[0_2px_8px_rgba(11,37,69,0.15)] backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

type ObjektKurz = Pick<Property, "id" | "slug" | "title" | "city" | "priceLabel" | "status" | "published" | "featured" | "images">;

export function ObjektKarte({ objekt, erstes, letztes }: { objekt: ObjektKurz; erstes: boolean; letztes: boolean }) {
  const zeigen = useToast();
  const router = useRouter();
  const [, starten] = useTransition();
  const [zustand, setZustand] = useOptimistic({ online: objekt.published, hervorgehoben: objekt.featured });

  function ausfuehren(aenderung: Partial<typeof zustand>, aktion: () => Promise<unknown>, meldung: string) {
    starten(async () => {
      setZustand((jetzt) => ({ ...jetzt, ...aenderung }));
      try {
        await aktion();
        zeigen(meldung);
      } catch {
        zeigen("Das hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal.", "fehler");
      }
    });
  }

  const rueckfrage = useRueckfrage({
    titel: "Objekt löschen?",
    text: (
      <>
        „{objekt.title}“ verschwindet von der Website und aus der App, mit allen Fotos. Das lässt sich nicht rückgängig machen.
      </>
    ),
    bestaetigen: "Endgültig löschen",
    aktion: async () => {
      await objektLoeschen(objekt.id);
      zeigen("Das Objekt wurde gelöscht.");
      router.refresh();
    },
  });

  const punkte: (MenuePunkt | "trenner")[] = [
    { label: "Bearbeiten", symbol: Pencil, href: `/admin/immobilien/${objekt.id}` },
    ...(zustand.online
      ? [{ label: "Auf der Website ansehen", symbol: Globe, href: `/immobilien/${objekt.slug}`, extern: true }]
      : []),
    "trenner",
    zustand.online
      ? {
          label: "Offline nehmen",
          symbol: EyeOff,
          onSelect: () => ausfuehren({ online: false }, () => objektOnline(objekt.id, false), "Offline — das Objekt ist nicht mehr zu sehen."),
        }
      : {
          label: "Online stellen",
          symbol: Eye,
          onSelect: () => ausfuehren({ online: true }, () => objektOnline(objekt.id, true), "Online — das Objekt steht auf der Website."),
        },
    zustand.hervorgehoben
      ? {
          label: "Nicht mehr auf der Startseite",
          symbol: Star,
          onSelect: () => ausfuehren({ hervorgehoben: false }, () => objektHervorheben(objekt.id, false), "Nicht mehr auf der Startseite hervorgehoben."),
        }
      : {
          label: "Auf der Startseite zeigen",
          symbol: Star,
          onSelect: () => ausfuehren({ hervorgehoben: true }, () => objektHervorheben(objekt.id, true), "Steht jetzt groß auf der Startseite."),
        },
    { label: "Weiter nach vorn", symbol: ArrowLeft, aus: erstes, onSelect: () => ausfuehren({}, () => objektVerschieben(objekt.id, -1), "Reihenfolge geändert.") },
    { label: "Weiter nach hinten", symbol: ArrowRight, aus: letztes, onSelect: () => ausfuehren({}, () => objektVerschieben(objekt.id, 1), "Reihenfolge geändert.") },
    "trenner",
    { label: "Löschen …", symbol: Trash2, gefahr: true, onSelect: rueckfrage.oeffnen },
  ];

  return (
    <>
      <Karteikarte
        href={`/admin/immobilien/${objekt.id}`}
        bild={objekt.images[0]}
        titel={objekt.title}
        ort={objekt.city}
        wert={objekt.priceLabel}
        online={zustand.online}
        oben={<StatusChip status={objekt.status} className="shadow-[0_2px_8px_rgba(11,37,69,0.12)]" />}
        unten={
          zustand.hervorgehoben ? (
            <Hinweis>
              <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden="true" />
              Startseite
            </Hinweis>
          ) : undefined
        }
        menue={<Menue label={`„${objekt.title}“: weitere Aktionen`} punkte={punkte} />}
      />
      {rueckfrage.dialog}
    </>
  );
}

type ReferenzKurz = Pick<ReferenceObject, "id" | "slug" | "title" | "region" | "typeLabel" | "categoryLabel" | "published" | "images" | "testimonial">;

export function ReferenzKarte({ referenz, erste, letzte }: { referenz: ReferenzKurz; erste: boolean; letzte: boolean }) {
  const zeigen = useToast();
  const router = useRouter();
  const [, starten] = useTransition();
  const [online, setOnline] = useOptimistic(referenz.published);

  function ausfuehren(neu: boolean | null, aktion: () => Promise<unknown>, meldung: string) {
    starten(async () => {
      if (neu !== null) setOnline(neu);
      try {
        await aktion();
        zeigen(meldung);
      } catch {
        zeigen("Das hat gerade nicht geklappt. Bitte versuchen Sie es noch einmal.", "fehler");
      }
    });
  }

  const rueckfrage = useRueckfrage({
    titel: "Referenz löschen?",
    text: <>„{referenz.title}“ verschwindet von der Website und aus der App, mit allen Fotos und der Kundenmeinung.</>,
    bestaetigen: "Endgültig löschen",
    aktion: async () => {
      await referenzLoeschen(referenz.id);
      zeigen("Die Referenz wurde gelöscht.");
      router.refresh();
    },
  });

  const punkte: (MenuePunkt | "trenner")[] = [
    { label: "Bearbeiten", symbol: Pencil, href: `/admin/referenzen/${referenz.id}` },
    ...(online ? [{ label: "Auf der Website ansehen", symbol: Globe, href: `/referenzen/${referenz.slug}`, extern: true }] : []),
    "trenner",
    online
      ? { label: "Offline nehmen", symbol: EyeOff, onSelect: () => ausfuehren(false, () => referenzOnline(referenz.id, false), "Offline — die Referenz ist nicht mehr zu sehen.") }
      : { label: "Online stellen", symbol: Eye, onSelect: () => ausfuehren(true, () => referenzOnline(referenz.id, true), "Online — die Referenz steht auf der Website.") },
    { label: "Weiter nach vorn", symbol: ArrowLeft, aus: erste, onSelect: () => ausfuehren(null, () => referenzVerschieben(referenz.id, -1), "Reihenfolge geändert.") },
    { label: "Weiter nach hinten", symbol: ArrowRight, aus: letzte, onSelect: () => ausfuehren(null, () => referenzVerschieben(referenz.id, 1), "Reihenfolge geändert.") },
    "trenner",
    { label: "Löschen …", symbol: Trash2, gefahr: true, onSelect: rueckfrage.oeffnen },
  ];

  return (
    <>
      <Karteikarte
        href={`/admin/referenzen/${referenz.id}`}
        bild={referenz.images[0]}
        titel={referenz.title}
        ort={[referenz.region, referenz.typeLabel].filter(Boolean).join(" · ")}
        online={online}
        oben={<Hinweis>{referenz.categoryLabel}</Hinweis>}
        unten={
          referenz.testimonial ? (
            <Hinweis>
              <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden="true" />
              {referenz.testimonial.rating
                ? referenz.testimonial.rating.toLocaleString("de-DE", { maximumFractionDigits: 1 })
                : "Kundenmeinung"}
            </Hinweis>
          ) : undefined
        }
        menue={<Menue label={`„${referenz.title}“: weitere Aktionen`} punkte={punkte} />}
      />
      {rueckfrage.dialog}
    </>
  );
}

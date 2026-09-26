"use client";

import { useCallback, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ArrowLeft, ArrowRight, ImagePlus, Star, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { lokalesBild } from "@/data/wix-media";
import { ERLAUBTE_FOTOTYPEN, FOTO_BUCKET, MAX_FOTO_BYTES } from "@/lib/admin/fotos";
import { useGeaendert } from "./Formular";
import { Menue } from "./Menue";
import { useToast } from "./Toast";
import { klassen } from "./ui";

export type FotoSpeicher = "blob" | "supabase";

type Laedt = { id: string; vorschau: string; fortschritt: number | null };

const LANGE_KANTE = 2560;

/**
 * Macht aus einem Telefonfoto eine Datei für die Website: höchstens 2560
 * Pixel an der langen Kante, als JPEG. Aus 8 MB werden so meist unter 1 MB —
 * das Hochladen dauert Sekunden statt Minuten, auch unterwegs. Kleine
 * Dateien bleiben, wie sie sind; ein freigestelltes PNG behält so seine
 * Transparenz.
 */
async function vorbereiten(datei: File): Promise<File> {
  const erlaubt = (ERLAUBTE_FOTOTYPEN as readonly string[]).includes(datei.type);
  if (erlaubt && datei.size <= 2.5 * 1024 * 1024) return datei;

  let bild: ImageBitmap;
  try {
    bild = await createImageBitmap(datei, { imageOrientation: "from-image" });
  } catch {
    if (erlaubt && datei.size <= MAX_FOTO_BYTES) return datei;
    throw new Error("format");
  }

  const faktor = Math.min(1, LANGE_KANTE / Math.max(bild.width, bild.height));
  const breite = Math.round(bild.width * faktor);
  const hoehe = Math.round(bild.height * faktor);
  const leinwand = document.createElement("canvas");
  leinwand.width = breite;
  leinwand.height = hoehe;
  const kontext = leinwand.getContext("2d");
  if (!kontext) return datei;
  kontext.fillStyle = "#ffffff";
  kontext.fillRect(0, 0, breite, hoehe);
  kontext.imageSmoothingQuality = "high";
  kontext.drawImage(bild, 0, 0, breite, hoehe);
  bild.close();

  const ergebnis = await new Promise<Blob | null>((fertig) => leinwand.toBlob(fertig, "image/jpeg", 0.86));
  if (!ergebnis) return datei;
  return new File([ergebnis], `${datei.name.replace(/\.[^.]+$/, "") || "foto"}.jpg`, { type: "image/jpeg" });
}

function endung(datei: File) {
  return datei.type === "image/png" ? "png" : datei.type === "image/webp" ? "webp" : datei.type === "image/avif" ? "avif" : "jpg";
}

/**
 * Die Fotos eines Objekts.
 *
 * Das erste ist das Titelbild — es steht groß vorn und trägt die Karte auf
 * der Website. Reihenfolge ändern: am Rechner ziehen, am Telefon über das
 * Menü am Foto. Entfernte Fotos verschwinden erst beim Speichern aus dem
 * Speicher; bis dahin lässt sich alles verwerfen.
 */
export function Fotos({
  name,
  anfangs,
  ordner,
  speicher,
}: {
  name: string;
  anfangs: string[];
  /** Unterordner im Speicher — die Kennung des Objekts. */
  ordner: string;
  speicher: FotoSpeicher;
}) {
  const [fotos, setFotos] = useState(anfangs);
  const [laedt, setLaedt] = useState<Laedt[]>([]);
  const [ziehen, setZiehen] = useState<number | null>(null);
  const [ueber, setUeber] = useState(false);
  const eingabe = useRef<HTMLInputElement>(null);
  const geaendert = useGeaendert();
  const zeigen = useToast();

  const aendern = useCallback(
    (neu: (jetzt: string[]) => string[]) => {
      setFotos(neu);
      geaendert();
    },
    [geaendert]
  );

  async function hochladen(datei: File, id: string): Promise<string> {
    const fertig = await vorbereiten(datei);
    if (fertig.size > MAX_FOTO_BYTES * 2) throw new Error("gross");

    if (speicher === "blob") {
      const ergebnis = await upload(`objekte/${ordner}/foto.${endung(fertig)}`, fertig, {
        access: "public",
        handleUploadUrl: "/api/admin/fotos",
        contentType: fertig.type,
        onUploadProgress: ({ percentage }) =>
          setLaedt((jetzt) => jetzt.map((eintrag) => (eintrag.id === id ? { ...eintrag, fortschritt: percentage } : eintrag))),
      });
      return ergebnis.url;
    }

    const supabase = createClient();
    const pfad = `${ordner}/${crypto.randomUUID()}.${endung(fertig)}`;
    const { error } = await supabase.storage.from(FOTO_BUCKET).upload(pfad, fertig, {
      cacheControl: "31536000",
      upsert: false,
      contentType: fertig.type,
    });
    if (error) throw error;
    return supabase.storage.from(FOTO_BUCKET).getPublicUrl(pfad).data.publicUrl;
  }

  async function dateienNehmen(liste: FileList | null) {
    const dateien = Array.from(liste ?? []).filter((datei) => datei.type.startsWith("image/") || /\.(heic|heif)$/i.test(datei.name));
    if (eingabe.current) eingabe.current.value = "";
    if (dateien.length === 0) return;

    const auftraege = dateien.map((datei) => ({ datei, id: crypto.randomUUID(), vorschau: URL.createObjectURL(datei) }));
    setLaedt((jetzt) => [...jetzt, ...auftraege.map(({ id, vorschau }) => ({ id, vorschau, fortschritt: speicher === "blob" ? 0 : null }))]);

    // Drei gleichzeitig: schnell genug, ohne eine schwache Verbindung zu verstopfen.
    const warteschlange = [...auftraege];
    let fehler = 0;
    await Promise.all(
      Array.from({ length: Math.min(3, auftraege.length) }, async () => {
        for (let auftrag = warteschlange.shift(); auftrag; auftrag = warteschlange.shift()) {
          try {
            const url = await hochladen(auftrag.datei, auftrag.id);
            aendern((jetzt) => [...jetzt, url]);
          } catch (error) {
            fehler += 1;
            console.error("Foto konnte nicht hochgeladen werden:", error);
          } finally {
            URL.revokeObjectURL(auftrag.vorschau);
            setLaedt((jetzt) => jetzt.filter((eintrag) => eintrag.id !== auftrag.id));
          }
        }
      })
    );

    if (fehler > 0) {
      zeigen(
        fehler === dateien.length
          ? "Das Foto ließ sich nicht hochladen. Bitte versuchen Sie es noch einmal — am besten als JPG."
          : `${fehler} von ${dateien.length} Fotos ließen sich nicht hochladen.`,
        "fehler"
      );
    }
  }

  function verschieben(von: number, nach: number) {
    if (von === nach || nach < 0 || nach >= fotos.length) return;
    aendern((jetzt) => {
      const neu = [...jetzt];
      const [foto] = neu.splice(von, 1);
      neu.splice(nach, 0, foto!);
      return neu;
    });
  }

  const auswaehlen = () => eingabe.current?.click();
  const leer = fotos.length === 0 && laedt.length === 0;

  return (
    <div
      onDragOver={(event) => {
        if (ziehen !== null) return;
        event.preventDefault();
        setUeber(true);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setUeber(false);
      }}
      onDrop={(event) => {
        if (ziehen !== null) return;
        event.preventDefault();
        setUeber(false);
        void dateienNehmen(event.dataTransfer.files);
      }}
      className={klassen("rounded-[18px] transition-shadow duration-200", ueber && "ring-2 ring-accent-deep ring-offset-4")}
    >
      {fotos.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
      <input
        ref={eingabe}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => void dateienNehmen(event.target.files)}
      />

      {leer ? (
        <button
          type="button"
          onClick={auswaehlen}
          className="group flex w-full flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-border-strong bg-surface-cool/60 px-6 py-14 text-center transition-colors hover:border-accent hover:bg-accent-tint"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white text-accent-deep shadow-[0_2px_8px_rgba(11,37,69,0.08)] transition-transform duration-200 group-hover:scale-105">
            <ImagePlus className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="mt-4 font-display text-[1.0625rem] font-bold text-ink">Fotos hinzufügen</span>
          <span className="mt-1.5 max-w-xs text-[0.875rem] leading-relaxed text-text-muted">
            Hierher ziehen oder antippen. Das erste Foto wird das Titelbild.
          </span>
        </button>
      ) : (
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {fotos.map((url, index) => (
            <li
              key={url}
              draggable
              onDragStart={(event) => {
                setZiehen(index);
                event.dataTransfer.effectAllowed = "move";
              }}
              onDragEnd={() => setZiehen(null)}
              onDragOver={(event) => {
                if (ziehen === null) return;
                event.preventDefault();
                if (ziehen !== index) {
                  verschieben(ziehen, index);
                  setZiehen(index);
                }
              }}
              className={klassen(
                "group relative overflow-hidden rounded-[16px] bg-surface-mist ring-1 ring-black/[0.04] transition-[opacity,transform] duration-200",
                index === 0 ? "col-span-2 row-span-2 aspect-[4/3] sm:aspect-auto" : "aspect-[4/3]",
                ziehen === index && "scale-[0.97] opacity-50",
                "cursor-grab active:cursor-grabbing"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- Vorschau in der App, kein Bild der Website */}
              <img src={lokalesBild(url)} alt="" draggable={false} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />

              {index === 0 && (
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.75rem] font-bold text-ink shadow-[0_2px_8px_rgba(11,37,69,0.15)] backdrop-blur">
                  <Star className="h-3.5 w-3.5 text-amber-400" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                  Titelbild
                </span>
              )}

              <div className="absolute right-2 top-2">
                <Menue
                  label={`Foto ${index + 1}: Aktionen`}
                  punkte={[
                    ...(index > 0
                      ? [{ label: "Als Titelbild verwenden", symbol: Star, onSelect: () => verschieben(index, 0) }]
                      : []),
                    { label: "Weiter nach vorn", symbol: ArrowLeft, onSelect: () => verschieben(index, index - 1), aus: index === 0 },
                    {
                      label: "Weiter nach hinten",
                      symbol: ArrowRight,
                      onSelect: () => verschieben(index, index + 1),
                      aus: index === fotos.length - 1,
                    },
                    "trenner",
                    {
                      label: "Foto entfernen",
                      symbol: Trash2,
                      gefahr: true,
                      onSelect: () => aendern((jetzt) => jetzt.filter((eintrag) => eintrag !== url)),
                    },
                  ]}
                />
              </div>
            </li>
          ))}

          {laedt.map((eintrag) => (
            <li key={eintrag.id} className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-surface-mist">
              {/* eslint-disable-next-line @next/next/no-img-element -- lokale Vorschau während des Hochladens */}
              <img src={eintrag.vorschau} alt="" className="h-full w-full object-cover opacity-60 blur-[1px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-deep/25">
                <span className="text-[0.8125rem] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)]">
                  {eintrag.fortschritt === null ? "Wird hochgeladen …" : `${Math.round(eintrag.fortschritt)} %`}
                </span>
                <span className="h-1.5 w-2/3 overflow-hidden rounded-full bg-white/40">
                  <span
                    className={klassen("block h-full rounded-full bg-white transition-[width] duration-300", eintrag.fortschritt === null && "w-1/3 animate-[laden_1.2s_ease-in-out_infinite]")}
                    style={eintrag.fortschritt === null ? undefined : { width: `${Math.max(6, eintrag.fortschritt)}%` }}
                  />
                </span>
              </div>
            </li>
          ))}

          <li className="aspect-[4/3]">
            <button
              type="button"
              onClick={auswaehlen}
              className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-border-strong text-text-muted transition-colors hover:border-accent hover:bg-accent-tint hover:text-accent-deep"
            >
              <ImagePlus className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
              <span className="text-[0.875rem] font-semibold">Fotos hinzufügen</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

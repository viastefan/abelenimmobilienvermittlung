"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState, type ReactNode } from "react";

/**
 * Ein Foto, das nicht kaputt gehen kann.
 *
 * `next/image` zeigt das Symbol für ein zerbrochenes Bild, sobald die Quelle
 * nicht antwortet. Ein Teil der Fotos liegt noch auf dem Server des
 * bisherigen Auftritts — fällt der aus oder wird er abgeschaltet, stünde
 * dieses Symbol quer über der Website. Schlägt das Laden fehl, tritt hier
 * deshalb `fallback` an die Stelle des Bildes: die Markenfläche, die
 * gezeichnete Marke, oder nichts.
 *
 * Zwei Wege führen zum Fehler, beide werden gebraucht: `onError` meldet
 * Bilder, die während der Sitzung scheitern. Bilder, die schon vor der
 * Hydratation gescheitert sind, haben ihr Ereignis dagegen längst gefeuert —
 * sie erkennt der Ref beim ersten Rendern an ihrer Breite von null.
 */
export function PhotoImage({
  fallback = null,
  onFailed,
  ...imageProps
}: ImageProps & {
  /** Was anstelle des Bildes erscheint. Ohne Angabe bleibt der Platz leer. */
  fallback?: ReactNode;
  /** Zusätzliche Reaktion, z. B. um den ganzen Rahmen auszublenden. */
  onFailed?: () => void;
}) {
  const [failed, setFailed] = useState(false);

  const fail = useCallback(() => {
    setFailed(true);
    onFailed?.();
  }, [onFailed]);

  const checkLoaded = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth === 0) fail();
    },
    [fail]
  );

  if (failed) return <>{fallback}</>;

  // `alt` steckt in `imageProps` und ist über `ImageProps` Pflicht — der
  // Linter sieht nur den Spread und hält es für vergessen.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...imageProps} ref={checkLoaded} onError={fail} />;
}

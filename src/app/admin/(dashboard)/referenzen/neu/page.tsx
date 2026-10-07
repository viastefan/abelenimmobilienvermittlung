import { randomUUID } from "node:crypto";
import { ReferenceEditor } from "@/components/admin/ReferenceEditor";
import { Seitenkopf } from "@/components/admin/ui";
import { fotoSpeicher } from "@/lib/admin/speicher";
import { referenzAnlegen } from "@/app/admin/reference-actions";

export const metadata = { title: "Neue Referenz" };

export default function NeueReferenz() {
  return (
    <>
      <Seitenkopf
        zurueck={{ href: "/admin/referenzen", label: "Referenzen" }}
        titel="Neue Referenz"
        unterzeile="Ein vermitteltes Objekt für die Seite „Objekte & Referenzen“ — gern mit der Meinung der Eigentümer."
      />
      <ReferenceEditor aktion={referenzAnlegen} speicher={fotoSpeicher()} ordner={randomUUID()} />
    </>
  );
}

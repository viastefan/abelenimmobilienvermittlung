import { randomUUID } from "node:crypto";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { Seitenkopf } from "@/components/admin/ui";
import { fotoSpeicher } from "@/lib/admin/speicher";
import { objektAnlegen } from "../../../actions";

export const metadata = { title: "Neues Objekt" };

export default function NeuesObjekt() {
  return (
    <>
      <Seitenkopf
        zurueck={{ href: "/admin/immobilien", label: "Objekte" }}
        titel="Neues Objekt"
        unterzeile="Tragen Sie ein, was Sie schon wissen. Auf der Website erscheint es erst, wenn Sie es unten einschalten."
      />
      <PropertyEditor aktion={objektAnlegen} speicher={fotoSpeicher()} ordner={randomUUID()} />
    </>
  );
}

import { SearchX } from "lucide-react";
import { KnopfLink, Leer } from "@/components/admin/ui";

export default function AdminNichtGefunden() {
  return (
    <Leer
      symbol={<SearchX className="h-6 w-6" strokeWidth={1.8} />}
      titel="Das gibt es hier nicht mehr"
      text="Vielleicht wurde der Eintrag gerade gelöscht. In der Übersicht finden Sie alles, was es gibt."
      aktion={<KnopfLink href="/admin">Zur Übersicht</KnopfLink>}
    />
  );
}

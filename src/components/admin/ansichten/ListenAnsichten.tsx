import { Award, Building2, Plus } from "lucide-react";
import type { Property } from "@/types/property";
import type { ReferenceObject } from "@/types/reference";
import { ObjektKarte, ReferenzKarte } from "../Karten";
import { KnopfLink, Leer, Seitenkopf } from "../ui";

function Neu({ href, label }: { href: string; label: string }) {
  return (
    <KnopfLink href={href}>
      <Plus className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.2} aria-hidden="true" />
      {label}
    </KnopfLink>
  );
}

export function ObjekteAnsicht({ objekte }: { objekte: Property[] }) {
  const online = objekte.filter((objekt) => objekt.published).length;

  return (
    <>
      <Seitenkopf
        titel="Objekte"
        unterzeile={
          objekte.length === 0
            ? "Was Sie verkaufen, steht hier — und auf Ihrer Website."
            : `${online} von ${objekte.length} ${objekte.length === 1 ? "Objekt ist" : "Objekten sind"} online. So, wie sie hier stehen, stehen sie auch auf der Website.`
        }
        aktion={<Neu href="/admin/immobilien/neu" label="Neues Objekt" />}
      />

      {objekte.length === 0 ? (
        <Leer
          symbol={<Building2 className="h-6 w-6" strokeWidth={1.8} />}
          titel="Noch kein Objekt"
          text="Legen Sie Ihr erstes Objekt an. Sobald Sie es online stellen, erscheint es auf der Website."
          aktion={<Neu href="/admin/immobilien/neu" label="Objekt anlegen" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {objekte.map((objekt, index) => (
            <ObjektKarte key={objekt.id} objekt={objekt} erstes={index === 0} letztes={index === objekte.length - 1} />
          ))}
        </div>
      )}
    </>
  );
}

export function ReferenzenAnsicht({ referenzen }: { referenzen: ReferenceObject[] }) {
  const online = referenzen.filter((referenz) => referenz.published).length;

  return (
    <>
      <Seitenkopf
        titel="Referenzen"
        unterzeile={
          referenzen.length === 0
            ? "Vermittelte Objekte — der beste Beleg für Ihre Arbeit."
            : `${online} von ${referenzen.length} ${referenzen.length === 1 ? "Referenz ist" : "Referenzen sind"} online.`
        }
        aktion={<Neu href="/admin/referenzen/neu" label="Neue Referenz" />}
      />

      {referenzen.length === 0 ? (
        <Leer
          symbol={<Award className="h-6 w-6" strokeWidth={1.8} />}
          titel="Noch keine Referenz"
          text="Legen Sie vermittelte Objekte an, gern mit der Meinung der Eigentümer. Sie erscheinen auf der Seite „Objekte & Referenzen“."
          aktion={<Neu href="/admin/referenzen/neu" label="Referenz anlegen" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {referenzen.map((referenz, index) => (
            <ReferenzKarte key={referenz.id} referenz={referenz} erste={index === 0} letzte={index === referenzen.length - 1} />
          ))}
        </div>
      )}
    </>
  );
}

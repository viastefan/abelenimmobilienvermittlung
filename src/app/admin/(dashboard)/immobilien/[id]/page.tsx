import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Globe } from "lucide-react";
import { PropertyEditor } from "@/components/admin/PropertyEditor";
import { MeldungAusAdresse } from "@/components/admin/Toast";
import { OnlineChip, Seitenkopf, StatusChip, knopf } from "@/components/admin/ui";
import { getPropertyByIdAdmin } from "@/lib/admin/properties-data";
import { fotoSpeicher } from "@/lib/admin/speicher";
import { objektSpeichern } from "../../../actions";

export const metadata = { title: "Objekt bearbeiten" };

export default async function ObjektBearbeiten({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const objekt = await getPropertyByIdAdmin(id);
  if (!objekt) notFound();

  return (
    <>
      <Seitenkopf
        zurueck={{ href: "/admin/immobilien", label: "Objekte" }}
        titel={objekt.title}
        unterzeile={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <StatusChip status={objekt.status} />
            <OnlineChip online={objekt.published} />
            <span>{objekt.city}</span>
          </span>
        }
        aktion={
          objekt.published ? (
            <a href={`/immobilien/${objekt.slug}`} target="_blank" rel="noreferrer" className={knopf.zweit}>
              <Globe className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
              Auf der Website ansehen
            </a>
          ) : undefined
        }
      />
      <PropertyEditor objekt={objekt} aktion={objektSpeichern.bind(null, objekt.id)} speicher={fotoSpeicher()} ordner={objekt.id} />
      <Suspense>
        <MeldungAusAdresse texte={{ angelegt: "Das Objekt ist angelegt." }} />
      </Suspense>
    </>
  );
}

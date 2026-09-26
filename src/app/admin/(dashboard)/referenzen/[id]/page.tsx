import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Globe } from "lucide-react";
import { ReferenceEditor } from "@/components/admin/ReferenceEditor";
import { MeldungAusAdresse } from "@/components/admin/Toast";
import { OnlineChip, Seitenkopf, knopf } from "@/components/admin/ui";
import { getReferenceByIdAdmin } from "@/lib/admin/references-data";
import { fotoSpeicher } from "@/lib/admin/speicher";
import { referenzSpeichern } from "@/app/admin/reference-actions";

export const metadata = { title: "Referenz bearbeiten" };

export default async function ReferenzBearbeiten({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const referenz = await getReferenceByIdAdmin(id);
  if (!referenz) notFound();

  return (
    <>
      <Seitenkopf
        zurueck={{ href: "/admin/referenzen", label: "Referenzen" }}
        titel={referenz.title}
        unterzeile={
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center rounded-full bg-[#EEF1F4] px-2.5 py-1 text-[0.75rem] font-semibold text-text-muted">
              {referenz.categoryLabel}
            </span>
            <OnlineChip online={referenz.published} />
            <span>{referenz.region}</span>
          </span>
        }
        aktion={
          referenz.published ? (
            <a href={`/referenzen/${referenz.slug}`} target="_blank" rel="noreferrer" className={knopf.zweit}>
              <Globe className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.9} aria-hidden="true" />
              Auf der Website ansehen
            </a>
          ) : undefined
        }
      />
      <ReferenceEditor referenz={referenz} aktion={referenzSpeichern.bind(null, referenz.id)} speicher={fotoSpeicher()} ordner={referenz.id} />
      <Suspense>
        <MeldungAusAdresse texte={{ angelegt: "Die Referenz ist angelegt." }} />
      </Suspense>
    </>
  );
}

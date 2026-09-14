import Link from "next/link";
import { Mail, Phone, Trash2 } from "lucide-react";
import { getInquiriesAdmin } from "@/lib/admin/inquiries-data";
import { deleteInquiry, saveInquiryNote, setInquiryStatus } from "@/app/admin/inquiry-actions";
import { ConfirmSubmitButton } from "@/components/admin/ConfirmSubmitButton";
import { AdminPageHeader, EmptyState, adminButton, inputClass } from "@/components/admin/ui";
import { formatInquiryDate, inquiryStatuses, type InquiryStatus } from "@/types/inquiry";

const statusTone: Record<InquiryStatus, string> = {
  neu: "bg-accent-soft text-accent-deep",
  "in-bearbeitung": "bg-warning-soft text-warning",
  erledigt: "bg-surface-cool text-text-muted",
};

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: filterParam } = await searchParams;
  const inquiries = await getInquiriesAdmin();

  const filter = inquiryStatuses.some((item) => item.value === filterParam) ? filterParam : undefined;
  const visible = filter ? inquiries.filter((item) => item.status === filter) : inquiries;
  const openCount = inquiries.filter((item) => item.status === "neu").length;

  const segments = [
    { href: "/admin/anfragen", label: "Alle", count: inquiries.length, active: !filter },
    ...inquiryStatuses.map((item) => ({
      href: `/admin/anfragen?status=${item.value}`,
      label: item.label,
      count: inquiries.filter((inquiry) => inquiry.status === item.value).length,
      active: filter === item.value,
    })),
  ];

  return (
    <div>
      <AdminPageHeader
        title="Anfragen"
        description={
          openCount > 0
            ? `${openCount} neue ${openCount === 1 ? "Anfrage wartet" : "Anfragen warten"} auf eine Antwort.`
            : "Alle Anfragen sind bearbeitet."
        }
      />

      {/* Segmentierte Auswahl wie in den Systemeinstellungen. */}
      <nav
        aria-label="Anfragen filtern"
        className="mt-7 inline-flex rounded-[12px] border border-border bg-white p-1"
      >
        {segments.map((segment) => (
          <Link
            key={segment.href}
            href={segment.href}
            aria-current={segment.active ? "page" : undefined}
            className={`rounded-[9px] px-3.5 py-2 text-[0.8125rem] font-semibold transition-colors duration-200 ${
              segment.active ? "bg-ink text-white" : "text-text-muted hover:text-ink"
            }`}
          >
            {segment.label}
            <span className={`ml-2 tabular-nums ${segment.active ? "text-white/60" : "text-text-subtle"}`}>
              {segment.count}
            </span>
          </Link>
        ))}
      </nav>

      {visible.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            title={filter ? "Keine Anfrage in dieser Auswahl" : "Noch keine Anfragen"}
            description={
              filter
                ? "Wechseln Sie die Auswahl oben, um andere Anfragen zu sehen."
                : "Sobald jemand das Kontaktformular ausfüllt, erscheint die Anfrage hier — auch dann, wenn der E-Mail-Versand ausfällt."
            }
          />
        </div>
      ) : (
        <ul className="mt-7 space-y-4">
          {visible.map((inquiry) => (
            <li key={inquiry.id} className="overflow-hidden rounded-[14px] border border-border bg-white">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="font-display text-[0.9375rem] font-bold text-ink">{inquiry.name}</p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[0.75rem] font-semibold ${
                        statusTone[inquiry.status]
                      }`}
                    >
                      {inquiry.interestLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.75rem] tabular-nums text-text-subtle">
                    {formatInquiryDate(inquiry.createdAt)}
                    {inquiry.objectRef ? ` · Objekt: ${inquiry.objectRef}` : ""}
                    {inquiry.address ? ` · Adresse: ${inquiry.address}` : ""}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <a
                    href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                      `Ihre Anfrage — ${inquiry.interestLabel}`
                    )}`}
                    className={adminButton.secondary}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Antworten
                  </a>
                  {inquiry.phone && (
                    <a href={`tel:${inquiry.phone.replace(/[^+\d]/g, "")}`} className={adminButton.ghost}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {inquiry.phone}
                    </a>
                  )}
                  <form
                    action={async () => {
                      "use server";
                      await deleteInquiry(inquiry.id);
                    }}
                  >
                    <ConfirmSubmitButton
                      confirmMessage={`Anfrage von „${inquiry.name}“ endgültig löschen?`}
                      className={adminButton.ghost}
                      aria-label="Anfrage löschen"
                      title="Anfrage löschen"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </ConfirmSubmitButton>
                  </form>
                </div>
              </div>

              <div className="px-5 py-4">
                <p className="whitespace-pre-line text-[0.875rem] leading-relaxed text-text">
                  {inquiry.message}
                </p>

                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.75rem] text-text-muted">
                  <div className="flex gap-1.5">
                    <dt className="font-semibold text-text-subtle">E-Mail:</dt>
                    <dd>{inquiry.email}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="font-semibold text-text-subtle">Telefon:</dt>
                    <dd>{inquiry.phone || "—"}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col gap-4 border-t border-border bg-surface-cool px-5 py-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-text-subtle">
                    Status
                  </span>
                  {inquiryStatuses.map((option) => (
                    <form
                      key={option.value}
                      action={async () => {
                        "use server";
                        await setInquiryStatus(inquiry.id, option.value);
                      }}
                    >
                      <button
                        type="submit"
                        aria-pressed={inquiry.status === option.value}
                        className={`rounded-[9px] px-3 py-2 text-[0.8125rem] font-semibold transition-colors duration-200 ${
                          inquiry.status === option.value
                            ? "bg-ink text-white"
                            : "bg-white text-text-muted hover:text-ink"
                        }`}
                      >
                        {option.label}
                      </button>
                    </form>
                  ))}
                </div>

                <form
                  action={saveInquiryNote.bind(null, inquiry.id)}
                  className="flex w-full items-end gap-2 lg:max-w-md"
                >
                  <label className="flex-1">
                    <span className="mb-1.5 block text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-text-subtle">
                      Interne Notiz
                    </span>
                    <input
                      name="note"
                      defaultValue={inquiry.note}
                      placeholder="z. B. Rückruf am Montag"
                      className={inputClass}
                    />
                  </label>
                  <button type="submit" className={adminButton.secondary}>
                    Speichern
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

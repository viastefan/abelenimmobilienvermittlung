"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { contactInterests } from "@/data/contact";

/**
 * Kontaktseite: übernimmt Anliegen und Objektbezug aus der URL, damit ein
 * Klick auf „Besichtigung anfragen“ nicht bei einem leeren Formular endet.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const anliegen = searchParams.get("anliegen");
  const objekt = searchParams.get("objekt");

  return (
    <InquiryForm
      presetInterest={contactInterests.some((item) => item.value === anliegen) ? anliegen! : undefined}
      objectRef={objekt ?? undefined}
    />
  );
}

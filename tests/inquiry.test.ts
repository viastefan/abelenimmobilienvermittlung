import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatInquiryDate, isInquiryStatus, mapRowToInquiry } from "../src/types/inquiry.ts";

const row = {
  id: "abc",
  first_name: "Silke",
  last_name: "Beispiel",
  email: "silke@example.com",
  phone: "0221 123456",
  interest: "bewertung",
  object_ref: "Doppelhaushälfte, Leverkusen",
  message: "Bitte um Rückruf.",
  status: "neu",
  note: "",
  created_at: "2026-09-13T08:30:00.000Z",
  updated_at: "2026-09-13T08:30:00.000Z",
};

describe("mapRowToInquiry", () => {
  it("setzt den Namen zusammen und übersetzt das Anliegen", () => {
    const inquiry = mapRowToInquiry(row);
    assert.equal(inquiry.name, "Silke Beispiel");
    assert.equal(inquiry.interestLabel, "Immobilienbewertung");
    assert.equal(inquiry.objectRef, "Doppelhaushälfte, Leverkusen");
  });

  it("fällt bei unbekanntem Status auf „neu“ zurück", () => {
    const inquiry = mapRowToInquiry({ ...row, status: "irgendwas" });
    assert.equal(inquiry.status, "neu");
  });

  it("lässt ein unbekanntes Anliegen unverändert stehen, statt es zu verschweigen", () => {
    const inquiry = mapRowToInquiry({ ...row, interest: "sondersache" });
    assert.equal(inquiry.interestLabel, "sondersache");
  });
});

describe("isInquiryStatus", () => {
  it("erkennt die drei erlaubten Werte", () => {
    assert.equal(isInquiryStatus("neu"), true);
    assert.equal(isInquiryStatus("in-bearbeitung"), true);
    assert.equal(isInquiryStatus("erledigt"), true);
    assert.equal(isInquiryStatus("gelöscht"), false);
  });
});

describe("formatInquiryDate", () => {
  it("schreibt deutsches Datum mit Uhrzeit", () => {
    const formatted = formatInquiryDate("2026-09-13T08:30:00.000Z");
    assert.match(formatted, /^13\.09\.2026,\s\d{2}:\d{2}$/);
  });
});

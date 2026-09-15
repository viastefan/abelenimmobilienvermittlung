import type { PropertyFact } from "@/components/property/PropertyFacts";
import type { Property } from "@/types/property";

/**
 * Die Eckdaten, die auf der Startseite neben einem Objekt stehen.
 *
 * Ort, Zimmer und Wohnfläche hat jedes Objekt. Grundstück und Stellplätze
 * behalten die Beschriftung des Objekts — mal steht dort eine Anzahl, mal
 * ein Aufpreis — und entfallen, wo sie nicht gepflegt sind.
 */
export function propertyFacts(property: Property): PropertyFact[] {
  const feature = (icon: PropertyFact["icon"], pattern: RegExp): PropertyFact[] => {
    const entry = property.features.find((candidate) => pattern.test(candidate.label));
    return entry ? [{ icon, label: entry.label, value: entry.value }] : [];
  };

  return [
    { icon: "ort", label: "Ort", value: property.city },
    { icon: "zimmer", label: "Zimmer", value: String(property.rooms) },
    {
      icon: "flaeche",
      label: "Wohnfläche",
      value: `ca. ${property.livingSpace.toString().replace(".", ",")} m²`,
    },
    ...feature("grundstueck", /grundstück/i),
    ...feature("stellplatz", /stellplatz|stellplätze|garage/i),
  ];
}

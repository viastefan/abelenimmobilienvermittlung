import { getActiveProperties, getFeaturedActiveProperty } from "@/data/properties";
import { resolveFirstImage } from "@/lib/imagery";
import {
  PropertyShowcaseSlider,
  type ShowcaseSlide,
} from "@/components/home/PropertyShowcaseSlider";

/**
 * Die weiteren Angebote der Startseite. Das große Objekt weiter oben hat
 * seinen eigenen Block und taucht hier nicht noch einmal auf.
 *
 * Die Bildpfade werden hier serverseitig aufgelöst, weil die Diashow selbst
 * im Browser läuft und dort nicht ins Dateisystem sehen kann.
 */
export async function PropertyShowcase() {
  const [active, featured] = await Promise.all([getActiveProperties(), getFeaturedActiveProperty()]);
  const properties = active.filter((property) => property.slug !== featured?.slug);
  if (properties.length === 0) return null;

  const slides: ShowcaseSlide[] = properties.map((property) => ({
    slug: property.slug,
    title: property.title,
    city: property.city,
    statusLabel: property.statusLabel,
    priceLabel: property.priceLabel,
    livingSpace: `${property.livingSpace.toString().replace(".", ",")} m²`,
    rooms: `${property.rooms} Zimmer`,
    description: property.description.length > 0 ? property.description : [property.summary],
    image: resolveFirstImage(property.images),
  }));

  return <PropertyShowcaseSlider slides={slides} />;
}

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";

type Crumb = { label: string; href?: string };

/**
 * Page header. With `withMedia` the image runs to the right viewport edge on
 * large screens — the same treatment as the homepage hero, so every page
 * opens with the same silhouette.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  withMedia = false,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  withMedia?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  const hasMedia = withMedia || Boolean(image);
  // Stehen Brotkrümel darüber, wiederholt die Plakette nur deren letzten
  // Eintrag. Zwei Zeilen Kleinkram vor der Überschrift sind eine zu viel.
  const showEyebrow = Boolean(eyebrow) && !(breadcrumbs && breadcrumbs.length > 0);

  return (
    <section className="relative overflow-hidden bg-surface-mist">
      {hasMedia && (
        <div className="absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden lg:block" aria-hidden="true">
          <SiteImage src={image} priority sizes="45vw" label={eyebrow} alt="" />
        </div>
      )}

      <Container className="relative">
        <div
          className={`flex flex-col py-12 lg:py-16 ${
            hasMedia ? "lg:min-h-[21rem] lg:w-[52%] lg:justify-center" : "max-w-3xl"
          }`}
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Brotkrümelnavigation" className="mb-5">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-text-subtle">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-accent-deep">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-text-muted">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {showEyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className={`balance font-display text-display-xl font-extrabold text-ink ${showEyebrow ? "mt-4" : ""}`}>
            {title}
          </h1>
          {description && (
            <p className="pretty mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-text-muted">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center [&>a]:w-full sm:[&>a]:w-auto">
              {actions}
            </div>
          )}

          {hasMedia && (
            <div className="relative -mx-6 mt-8 aspect-[16/10] overflow-hidden sm:rounded-[24px] lg:hidden">
              <SiteImage src={image} sizes="100vw" label={eyebrow} alt={imageAlt ?? ""} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

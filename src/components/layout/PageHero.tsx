import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SiteImage } from "@/components/graphics/SiteImage";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  withMedia = false,
  image,
  imageAlt,
  caption,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Renders the two-column variant with an image beside the text. */
  withMedia?: boolean;
  image?: string;
  imageAlt?: string;
  caption?: { title: string; description: string };
}) {
  const hasMedia = withMedia || Boolean(image);

  return (
    <section className="hero-wash relative overflow-hidden border-b border-border">
      <Container
        className={`relative py-14 lg:py-20 ${
          hasMedia ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16" : ""
        }`}
      >
        <div className={hasMedia ? "" : "max-w-3xl"}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Brotkrümelnavigation" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-text-subtle">
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
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

          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="balance mt-4 font-display text-display-lg font-extrabold text-ink">{title}</h1>
          {description && (
            <p className="pretty mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-text-muted">
              {description}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>

        {hasMedia && (
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-surface-mist shadow-lift">
              <SiteImage
                src={image}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                label={caption?.title}
                alt={imageAlt ?? ""}
              />
            </div>
            {caption && (
              <div className="absolute -bottom-5 left-5 right-5 rounded-[14px] border border-border bg-white/95 p-4 shadow-soft backdrop-blur sm:left-auto sm:right-6 sm:w-[17rem]">
                <p className="font-display text-sm font-bold text-ink">{caption.title}</p>
                <p className="mt-1 text-[0.8125rem] leading-snug text-text-muted">{caption.description}</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

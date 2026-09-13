import type { ElementType, ReactNode } from "react";

/**
 * The single content container of the site: 1440px max width with generous
 * gutters. Sections may bleed full width — their content never does.
 */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`mx-auto w-full max-w-content px-5 sm:px-8 lg:px-12 ${className}`}>{children}</Tag>
  );
}

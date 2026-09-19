import type { ElementType, ReactNode } from "react";

/**
 * Der eine Satzspiegel der Website: 1440 Pixel breit, mit schmalen Rändern.
 * Abschnitte dürfen über die volle Breite laufen, ihr Inhalt nie.
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
    <Tag className={`mx-auto w-full max-w-content px-6 lg:px-10 ${className}`}>{children}</Tag>
  );
}

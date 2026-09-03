import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className = "", children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-content px-6 lg:px-10 ${className}`}>{children}</Tag>;
}

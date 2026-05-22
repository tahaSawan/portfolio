import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { containerInnerClassName } from "@/lib/containerLayout";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("relative z-[1]", containerInnerClassName, className)}>
      {children}
    </div>
  );
}

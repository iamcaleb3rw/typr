import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center   text-sm font-medium w duration-500 ease-out [--bg-size:300%] ",
        className
      )}
    >
      <div className={`absolute inset-0 block h-full w-full `} />

      {children}
    </div>
  );
}

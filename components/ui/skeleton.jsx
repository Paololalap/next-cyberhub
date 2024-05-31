import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-zinc-500 dark:bg-zinc-800", className)}
      {...props} />)
  );
}

export { Skeleton }

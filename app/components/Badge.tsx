import clsx from "clsx";

export default function Badge({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement> & { children: React.ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-block bg-primary text-foreground text-xs rounded-full px-2 py-1",
        className
      )}
    >
      {children}
    </span>
  );
}

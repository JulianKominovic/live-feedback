import clsx from "clsx";

export function H1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={clsx(
        "max-w-[60ch] text-center text-7xl font-medium",
        className
      )}
    />
  );
}
export function H2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={clsx(
        "max-w-[60ch] text-5xl font-medium text-center",
        className
      )}
    />
  );
}

export function H3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={clsx("max-w-[60ch] text-3xl text-center", className)}
    />
  );
}

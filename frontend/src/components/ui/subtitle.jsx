export function Subtitle({ tag, title, description, className, ...props }) {
  return (
    <section
      className={`mx-auto max-w-7xl w-full px-6 pt-14 pb-10 ${className || ""}`}
      {...props}
    >
      {tag && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider">
          {tag}
        </p>
      )}

      <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight bg-highlight text-accent">
        {title}
      </h1>

      {description && (
        <p className="mt-3 text-muted-foreground max-w-2xl">{description}</p>
      )}
    </section>
  );
}

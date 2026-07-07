import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        centered && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary to-brand-red" />
    </div>
  )
}
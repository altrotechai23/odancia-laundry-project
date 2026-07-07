import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface BaseProps {
  variant?: "primary" | "secondary"
  className?: string
}

interface LinkButtonProps extends BaseProps {
  href: string
  children: ReactNode
}

interface NativeButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    BaseProps {
  href?: never
  children: ReactNode
}

type ButtonProps = LinkButtonProps | NativeButtonProps

export function Button(props: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300",
    props.variant === "primary" &&
      "bg-brand-red text-white hover:scale-[1.03] hover:shadow-xl",
    props.variant === "secondary" &&
      "border border-border bg-card hover:bg-muted",
    props.className
  )

  if ("href" in props && props.href) {
    const { href, children } = props

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const { children, ...buttonProps } = props

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  )
}
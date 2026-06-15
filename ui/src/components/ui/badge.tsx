import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[#151B2D] text-[#A8B2D2] border-[#1A2035]",
        secondary: "bg-[#151B2D] text-[#666977] border-[#1A2035]",
        destructive: "bg-[#EF444414] text-[#EF4444] border-[#EF444433]",
        outline: "bg-transparent text-[#A8B2D2] border-[#1A2035]",
        ghost: "bg-transparent text-[#666977] border-transparent",
        link: "text-[#EAF0FF] underline-offset-4 [a&]:hover:underline border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

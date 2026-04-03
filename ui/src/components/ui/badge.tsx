import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-[color] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[#1A1A1A] text-[#8A8880] border-[#222222]",
        secondary: "bg-[#1A1A1A] text-[#4A4845] border-[#222222]",
        destructive: "bg-[#EF444414] text-[#EF4444] border-[#EF444433]",
        outline: "bg-transparent text-[#8A8880] border-[#222222]",
        ghost: "bg-transparent text-[#4A4845] border-transparent",
        link: "text-[#F2F0EB] underline-offset-4 [a&]:hover:underline border-transparent",
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

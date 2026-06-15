import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[13px] font-medium transition-[color,background-color,border-color,opacity] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF33] aria-invalid:border-[#EF4444]",
  {
    variants: {
      variant: {
        // Primary — off-white fill, black text
        default: "bg-[#EAF0FF] text-[#050811] hover:bg-white border-none shadow-none",
        // Destructive — transparent with red border/text
        destructive:
          "bg-transparent text-[#EF4444] border border-[#EF444433] hover:bg-[#EF44440D] shadow-none",
        // Outline / secondary — ghost with border
        outline:
          "bg-transparent text-[#A8B2D2] border border-[#1A2035] hover:border-[#26304A] hover:text-[#EAF0FF] shadow-none",
        // Secondary — subtle filled
        secondary:
          "bg-[#151B2D] text-[#A8B2D2] border border-[#1A2035] hover:border-[#26304A] hover:text-[#EAF0FF] shadow-none",
        // Ghost — no border, no fill
        ghost:
          "bg-transparent text-[#A8B2D2] hover:bg-[#151B2D] hover:text-[#EAF0FF] border-none shadow-none",
        link: "text-[#EAF0FF] underline-offset-4 hover:underline border-none shadow-none",
      },
      size: {
        default: "h-8 px-3 py-1.5 has-[>svg]:px-2.5",
        xs: "h-6 gap-1 rounded-full px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 rounded-full gap-1.5 px-2.5 has-[>svg]:px-2",
        lg: "h-9 rounded-full px-5 has-[>svg]:px-4",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[3px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

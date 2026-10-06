import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-mono tracking-wide transition-colors border select-none",
  {
    variants: {
      variant: {
        default:
          "border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.1)]",
        secondary:
          "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-white/20",
        outline:
          "border-zinc-800 text-zinc-400 bg-transparent",
        accent:
          "border-red-500/30 bg-red-500/10 text-red-400",
        status:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 rounded-full px-3 py-1 text-xs"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

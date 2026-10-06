"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080a] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:brightness-105 border border-orange-400/30 active:brightness-95",
        secondary:
          "bg-white/[0.05] text-zinc-100 hover:bg-white/[0.09] hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-sm",
        outline:
          "border border-white/12 bg-transparent hover:bg-white/[0.05] text-zinc-200 hover:text-white hover:border-orange-500/40",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/[0.05]",
        glow:
          "relative bg-zinc-950 text-white border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:shadow-[0_0_22px_rgba(249,115,22,0.25)] hover:border-orange-500/60"
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8.5 rounded-md px-3.5 text-xs font-mono",
        lg: "h-11.5 rounded-lg px-7 text-sm font-medium",
        icon: "h-9 w-9 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

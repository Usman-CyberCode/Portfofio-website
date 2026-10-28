"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030509] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] hover:brightness-110 border border-blue-400/30 active:scale-[0.98]",
        secondary:
          "bg-white/[0.04] text-slate-100 hover:bg-white/[0.08] hover:text-white border border-white/10 hover:border-blue-500/30 backdrop-blur-sm active:scale-[0.98]",
        outline:
          "border border-white/12 bg-transparent hover:bg-blue-500/10 text-slate-200 hover:text-white hover:border-blue-500/40 active:scale-[0.98]",
        ghost:
          "text-slate-400 hover:text-white hover:bg-white/[0.05]",
        glow:
          "relative bg-[#070c18] text-white border border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_28px_rgba(37,99,235,0.35)] hover:border-blue-400/60",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8.5 rounded-lg px-3.5 text-xs font-mono",
        lg: "h-11.5 rounded-xl px-7 text-sm font-medium",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
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

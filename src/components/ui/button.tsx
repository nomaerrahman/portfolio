import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg hover:shadow-[0_0_0_4px_hsl(var(--accent)/0.25),0_10px_40px_-10px_hsl(var(--accent)/0.6)]",
        accent: "bg-accent text-accent-fg hover:brightness-110 hover:shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.8)]",
        outline: "border border-border bg-surface/40 backdrop-blur hover:border-fg/40 hover:bg-elevated",
        ghost: "text-muted hover:text-fg hover:bg-elevated/70",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";

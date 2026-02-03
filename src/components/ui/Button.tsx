/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import * as React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "text";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

type MotionButtonProps = React.ComponentProps<typeof motion.button> &
    Omit<ButtonProps, "style">;

export const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            children,
            ...props
        },
        ref,
    ) => {
        const variants = {
            primary:
                "bg-accent hover:bg-accent-hover text-white border border-transparent",
            secondary:
                "bg-bg-surface hover:bg-bg-app text-text-primary border border-border-app hover:border-accent transition-colors",
            outline:
                "bg-transparent border border-border-app text-text-secondary hover:text-text-primary hover:border-text-primary hover:bg-bg-surface",
            ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface",
            danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
            text: "p-0 text-accent hover:text-accent-hover underline-offset-4 hover:underline",
        };

        const sizes = {
            sm: "h-8 px-3 text-xs rounded-md", // Changed to rounded-md
            md: "h-10 px-5 text-sm rounded-md", // Changed to rounded-md
            lg: "h-12 px-8 text-base rounded-lg",
            icon: "h-10 w-10 flex items-center justify-center rounded-md p-0",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center font-semibold transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-1 focus:ring-offset-bg-app disabled:opacity-50 disabled:pointer-events-none cursor-pointer tracking-wide",
                    variants[variant],
                    variant !== "text" ? sizes[size] : "",
                    className,
                    "shadow-none", // Enforce no shadow
                )}
                {...props}
            >
                {isLoading && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg
                            className="animate-spin h-5 w-5 text-current"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    </span>
                )}
                <span
                    className={cn(
                        "flex items-center gap-2",
                        isLoading ? "opacity-0" : "opacity-100",
                    )}
                >
                    {children}
                </span>
            </motion.button>
        );
    },
);

Button.displayName = "Button";

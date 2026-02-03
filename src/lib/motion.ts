import type { Variants } from "framer-motion";

// High Precision Animation Constants
export const EASE_OUT_PRECISION = [0.16, 1, 0.3, 1] as const; // Custom Bezier for "subtle & fast"

export const SPRING_TIGHT = {
    type: "spring",
    stiffness: 400,
    damping: 25,
    mass: 1,
} as const;

// Entrance Variants (Fade + Subtle Slide Up)
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 12, // Reduced from typical 20px to 12px for subtlety
        filter: "blur(2px)", // Subtle blur for premium feel
    },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.35,
            ease: EASE_OUT_PRECISION,
        },
    },
    exit: {
        opacity: 0,
        y: 4,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        },
    },
};

// Startger Container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08, // Fast stagger
            delayChildren: 0.05,
        },
    },
};

// Micro-interaction Variants (Button/Card Tap)
export const tapScale = {
    scale: 0.98,
    transition: SPRING_TIGHT,
} as const;

export const hoverScale = {
    scale: 1.005, // Very subtle lift
    transition: { duration: 0.2, ease: "easeOut" },
} as const;

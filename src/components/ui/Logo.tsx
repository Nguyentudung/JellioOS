import { motion, type Variants } from "framer-motion";
import JellioIcon from "../../assets/logo/Jellio.png";

export function JellioLogo({
    className = "w-8 h-8",
    animated = false,
}: {
    className?: string;
    animated?: boolean;
}) {
    const container: Variants = {
        hidden: { rotate: -90, opacity: 0 },
        show: {
            rotate: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 260, damping: 20 },
        },
    };

    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            variants={animated ? container : {}}
            initial={animated ? "hidden" : "show"}
            animate="show"
        >
            <img
                src={JellioIcon}
                alt="Jellio Logo"
                className="w-full h-full object-contain"
            />
        </motion.div>
    );
}

export function LogoText() {
    return (
        <span className="font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
            jellio
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 italic">
                OS
            </span>
        </span>
    );
}

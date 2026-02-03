/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { Link } from "react-router-dom";
import { Menu, X, Github, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { JellioLogo, LogoText } from "../ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
    {
        name: "QR Generator",
        href: "/tools/qr",
        description: "Tạo và tùy chỉnh mã QR",
    },
    // Future tools can be added here
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        // Theme initialization
        const savedTheme = localStorage.getItem("theme") as "light" | "dark";
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle(
                "dark",
                savedTheme === "dark",
            );
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = (e?: React.MouseEvent) => {
        const newTheme = theme === "light" ? "dark" : "light";

        // Helper to update DOM
        const updateDOM = () => {
            setTheme(newTheme);
            localStorage.setItem("theme", newTheme);
            document.documentElement.classList.toggle(
                "dark",
                newTheme === "dark",
            );
        };

        // Check if View Transitions API is supported
        if (
            !document.startViewTransition ||
            !e ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            updateDOM();
            return;
        }

        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        // Center of the circle (click position or button center)
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Calculate distance to the furthest corner to ensure full coverage
        const right = window.innerWidth - x;
        const bottom = window.innerHeight - y;
        const radius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

        const transition = document.startViewTransition(() => {
            updateDOM();
        });

        transition.ready.then(() => {
            // Animate the circle spread
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${radius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                },
            );
        });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-bg-app/90 backdrop-blur-md border-border-app py-2 shadow-none"
                    : "bg-transparent border-transparent py-4",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <JellioLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
                        <LogoText />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Trang chủ
                        </Link>

                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
                                Công cụ{" "}
                                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-64 bg-bg-surface border border-border-app rounded-lg shadow-none p-1 overflow-hidden">
                                    {tools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            to={tool.href}
                                            className="block px-4 py-3 rounded-md hover:bg-bg-app transition-colors group/item"
                                        >
                                            <div className="text-sm font-bold text-text-primary group-hover/item:text-primary">
                                                {tool.name}
                                            </div>
                                            <div className="text-xs text-text-secondary">
                                                {tool.description}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://github.com/Nguyentudung/JellioOS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>

                        <div className="h-4 w-px bg-border-app" />

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-text-secondary hover:text-text-primary relative overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-4 h-4" />
                                    ) : (
                                        <Moon className="w-4 h-4" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Button>

                        <Button
                            size="sm"
                            variant="primary"
                            className="rounded-md px-6"
                        >
                            Bắt đầu ngay
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleTheme}
                            className="text-text-secondary hover:text-text-primary relative overflow-hidden"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{
                                        scale: 0.5,
                                        rotate: 90,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        scale: 1,
                                        rotate: 0,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        scale: 0.5,
                                        rotate: 90,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-4 h-4" />
                                    ) : (
                                        <Moon className="w-4 h-4" />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors"
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border-app bg-bg-app overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-4">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="block text-base font-medium text-text-primary"
                            >
                                Trang chủ
                            </Link>
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                                    Công cụ
                                </div>
                                {tools.map((tool) => (
                                    <Link
                                        key={tool.href}
                                        to={tool.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block pl-4 text-sm text-text-secondary hover:text-text-primary py-2 border-l border-border-app"
                                    >
                                        {tool.name}
                                    </Link>
                                ))}
                            </div>
                            <a
                                href="https://github.com/Nguyentudung/JellioOS"
                                className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary"
                            >
                                <Github className="w-4 h-4" /> GitHub Repo
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

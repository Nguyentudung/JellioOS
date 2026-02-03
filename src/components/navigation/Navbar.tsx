/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { Link } from "react-router-dom";
import { Menu, X, Github, ChevronDown } from "lucide-react";
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
    // const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-2 shadow-sm"
                    : "bg-transparent border-transparent py-4",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <JellioLogo className="w-8 h-8 transition-transform group-hover:scale-110" />
                        <LogoText />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            to="/"
                            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Trang chủ
                        </Link>

                        <div className="relative group">
                            <button className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Công cụ{" "}
                                <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                <div className="w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 overflow-hidden">
                                    {tools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            to={tool.href}
                                            className="block px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">
                                                {tool.name}
                                            </div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                                {tool.description}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <a
                            href="https://github.com/jellioos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </a>

                        <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />

                        <Button
                            size="sm"
                            variant="primary"
                            className="rounded-full px-6"
                        >
                            Bắt đầu ngay
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                        className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
                    >
                        <div className="px-4 pt-4 pb-8 space-y-4">
                            <Link
                                to="/"
                                onClick={() => setIsOpen(false)}
                                className="block text-base font-medium text-slate-900 dark:text-white"
                            >
                                Trang chủ
                            </Link>
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Công cụ
                                </div>
                                {tools.map((tool) => (
                                    <Link
                                        key={tool.href}
                                        to={tool.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block pl-4 text-sm text-slate-600 dark:text-slate-300 py-2 border-l border-slate-200 dark:border-slate-800"
                                    >
                                        {tool.name}
                                    </Link>
                                ))}
                            </div>
                            <a
                                href="https://github.com/jellioos"
                                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
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

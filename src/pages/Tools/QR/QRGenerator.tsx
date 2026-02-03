/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "../../../components/layout/Sidebar";
import { Header } from "../../../components/layout/Header";
import {
    QRPreview,
    type QRPreviewHandle,
} from "../../../components/qr/QRPreview";
import type { QRState } from "../../../types/qr";

const initialState: QRState = {
    data: "https://jellio.os",
    dots: "rounded",
    corners: "extra-rounded",
    isGradient: false,
    color1: "#000000",
    color2: "#000000",
    bgColor: "#ffffff",
    logo: null,
    margin: 0,
    logoMargin: 0,
};

export default function QRGenerator() {
    const [history, setHistory] = useState<QRState[]>([initialState]);
    const [index, setIndex] = useState(0);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const qrRef = useRef<QRPreviewHandle>(null);

    const state = history[index];

    // Theme Init - sync with main app or local check
    useEffect(() => {
        if (document.documentElement.classList.contains("dark")) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.theme = newTheme;
        // We rely on the global class management, but here we can force it if needed
        // or better, let the Navbar/App handle global theme?
        // For now, let's keep local toggle working for this specific tool view context
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const updateState = (updates: Partial<QRState>) => {
        const newState = { ...state, ...updates };
        const newHistory = history.slice(0, index + 1);
        newHistory.push(newState);

        if (newHistory.length > 50) {
            newHistory.shift();
        }

        setHistory(newHistory);
        setIndex(newHistory.length - 1);
    };

    const undo = useCallback(() => {
        if (index > 0) setIndex(index - 1);
    }, [index]);

    const redo = useCallback(() => {
        if (index < history.length - 1) setIndex(index + 1);
    }, [index, history.length]);

    const randomize = () => {
        const colors = ["#2563eb", "#db2777", "#059669", "#d97706", "#7c3aed"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        updateState({
            color1: randomColor,
            isGradient: Math.random() > 0.5,
            color2: colors[Math.floor(Math.random() * colors.length)],
        });
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === "z") {
                    e.preventDefault();
                    undo();
                } else if (e.key === "y") {
                    e.preventDefault();
                    redo();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo]);

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-slate-50 dark:bg-dark-950 text-slate-800 dark:text-slate-100 font-sans mt-16">
            <Sidebar state={state} onChange={updateState} />

            <main className="flex-1 bg-slate-100 dark:bg-black flex flex-col relative overflow-hidden bg-grid">
                <Header
                    onUndo={undo}
                    onRedo={redo}
                    onRandomize={randomize}
                    onExport={(ext, size) => qrRef.current?.download(ext, size)}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    canUndo={index > 0}
                    canRedo={index < history.length - 1}
                />

                <div className="flex-1 flex items-center justify-center p-10 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <QRPreview ref={qrRef} state={state} />
                </div>
            </main>
        </div>
    );
}

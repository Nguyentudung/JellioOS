/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { Sidebar } from "../../../components/layout/Sidebar";
import { Header } from "../../../components/layout/Header";
import {
    QRPreview,
    type QRPreviewHandle,
} from "../../../components/qr/QRPreview";
import type { QRState } from "../../../types/qr";

const initialState: QRState = {
    data: "https://jellioos.vercel.app/",
    dots: "rounded",
    corners: "extra-rounded",
    qrColors: ["#000000"],
    qrGradientType: "linear",
    qrRotation: 0,
    bgColors: ["#ffffff"],
    bgGradientType: "linear",
    bgRotation: 0,
    logo: null,
    margin: 0,
    logoMargin: 0,
};

export default function QRGenerator() {
    const [history, setHistory] = useState<QRState[]>([initialState]);
    const [index, setIndex] = useState(0);
    const qrRef = useRef<QRPreviewHandle>(null);
    const state = history[index];
    const debouncedState = useDebounce(state, 150);

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
        const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
        const randomColor2 = colors[Math.floor(Math.random() * colors.length)];

        // Randomly choose 1 or 2 colors
        const isGradient = Math.random() > 0.5;
        const newColors = isGradient
            ? [randomColor1, randomColor2]
            : [randomColor1];

        updateState({
            qrColors: newColors,
            qrRotation: Math.floor(Math.random() * 360),
            bgColors: ["#ffffff"], // Keep bg simple for random or maybe random bg too? Let's keep simple.
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
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-bg-app text-text-primary font-sans">
            <Sidebar state={state} onChange={updateState} />

            <main className="flex-1 bg-bg-app flex flex-col relative overflow-hidden bg-grid">
                <Header
                    onUndo={undo}
                    onRedo={redo}
                    onRandomize={randomize}
                    onExport={(ext, size) => qrRef.current?.download(ext, size)}
                    canUndo={index > 0}
                    canRedo={index < history.length - 1}
                />

                <div className="flex-1 flex items-center justify-center p-10 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
                    <QRPreview ref={qrRef} state={debouncedState} />
                </div>
            </main>
        </div>
    );
}

/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/Home/HomePage";
import DonatePage from "./pages/Home/DonatePage";
import "./App.css";

// Lazy load tools to optimize bundle size
const QRGenerator = lazy(() => import("./pages/Tools/QR/QRGenerator"));
const SpeedTestPage = lazy(
    () => import("./pages/Tools/SpeedTest/SpeedTestPage"),
);
const MarkdownViewer = lazy(
    () => import("./pages/Tools/MarkdownViewer/MarkdownViewer"),
);

// Loading fallback component
const PageLoading = () => (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
    </div>
);

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-bg-app font-sans text-text-primary">
                    <Suspense fallback={<PageLoading />}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/donate" element={<DonatePage />} />
                            <Route path="/tools/qr" element={<QRGenerator />} />
                            <Route
                                path="/tools/speedtest"
                                element={<SpeedTestPage />}
                            />
                            <Route
                                path="/tools/markdown"
                                element={<MarkdownViewer />}
                            />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;

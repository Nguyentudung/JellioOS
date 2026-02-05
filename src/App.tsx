/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/Home/HomePage";
import DonatePage from "./pages/Home/DonatePage";
import QRGenerator from "./pages/Tools/QR/QRGenerator";
import SpeedTestPage from "./pages/Tools/SpeedTest/SpeedTestPage";
import "./App.css";

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-bg-app font-sans text-text-primary">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/donate" element={<DonatePage />} />
                        <Route path="/tools/qr" element={<QRGenerator />} />
                        <Route
                            path="/tools/speedtest"
                            element={<SpeedTestPage />}
                        />
                    </Routes>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;

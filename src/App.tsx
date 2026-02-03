/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/navigation/Navbar";
import HomePage from "./pages/Home/HomePage";
import QRGenerator from "./pages/Tools/QR/QRGenerator";
import "./App.css";

function App() {
    return (
        <HelmetProvider>
            <Router>
                <div className="min-h-screen bg-slate-50 dark:bg-dark-950 font-sans text-slate-900 dark:text-slate-100">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/tools/qr" element={<QRGenerator />} />
                    </Routes>
                </div>
            </Router>
        </HelmetProvider>
    );
}

export default App;

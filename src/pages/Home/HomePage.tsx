/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { Helmet } from "react-helmet-async";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { QrCode, ArrowRight, Zap, Code2, Box, Cpu } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { JellioLogo } from "../../components/ui/Logo";
import { Navbar } from "../../components/navigation/Navbar";

export default function HomePage() {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50 },
        },
    };

    return (
        <>
            <Helmet>
                <title>JellioOS - Hệ sinh thái công cụ web tối giản</title>
                <meta
                    name="description"
                    content="Khám phá JellioOS - bộ công cụ web hiện đại, mã nguồn mở, hỗ trợ Developer và Designer với các tiện ích QR Code, xử lý ảnh và PDF."
                />
                <meta
                    property="og:title"
                    content="JellioOS - Precision Web Tools"
                />
                <meta
                    property="og:description"
                    content="Minimalist, Open Source, Powerful."
                />
            </Helmet>

            <div className="min-h-screen bg-bg-app font-sans text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden">
                <Navbar />
                {/* Background Grid */}
                <div className="fixed inset-0 bg-grid-premium opacity-40 pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                    {/* Hero Section */}
                    <section className="flex flex-col items-center text-center space-y-10 mb-32 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <JellioLogo
                                className="w-24 h-24 mb-6 relative z-10"
                                animated={true}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 max-w-3xl"
                        >
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-1.1">
                                Tinh tế trong từng <br />
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-accent to-purple-500">
                                    Điểm ảnh & Dòng code
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-text-secondary font-medium leading-relaxed max-w-2xl mx-auto">
                                Hệ sinh thái công cụ web mã nguồn mở.{" "}
                                <br className="hidden md:block" /> Đơn giản,
                                mạnh mẽ và tôn trọng quyền riêng tư của bạn.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8"
                        >
                            <Link to="/tools/qr">
                                <Button
                                    size="lg"
                                    className="w-full sm:w-48 shadow-none"
                                >
                                    <Zap className="w-5 h-5 mr-2 fill-current" />{" "}
                                    Trải nghiệm Ngay
                                </Button>
                            </Link>
                            <a
                                href="https://github.com/Nguyentudung/JellioOS"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full sm:w-48"
                                >
                                    <Code2 className="w-5 h-5 mr-2" /> GitHub
                                    Repo
                                </Button>
                            </a>
                        </motion.div>
                    </section>

                    {/* Tools Grid */}
                    <section id="tools" className="relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    Trung tâm Công cụ
                                </h2>
                                <p className="text-text-secondary">
                                    Lựa chọn công cụ bạn cần để bắt đầu.
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-text-secondary"
                                >
                                    Xem tất cả{" "}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                        <motion.div
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-50px" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {/* Active Tool */}
                            <motion.div
                                variants={item}
                                className="group flex flex-col h-full bg-bg-surface border border-border-app rounded-2xl p-6 hover:border-accent transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-bg-app rounded-xl border border-border-app group-hover:border-accent/30 transition-colors">
                                        <QrCode className="w-8 h-8 text-accent" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20">
                                        Available
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-accent transition-colors">
                                    QR Studio
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Trình tạo mã QR cao cấp. Hỗ trợ tùy chỉnh
                                    logo, màu sắc gradient và định dạng vector
                                    (SVG).
                                </p>
                                <Link to="/tools/qr" className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                                    >
                                        Mở Công cụ{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Upcoming Tool 1 */}
                            <motion.div
                                variants={item}
                                className="opacity-60 flex flex-col h-full bg-bg-surface/30 border border-border-app border-dashed rounded-2xl p-6"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-bg-app/50 rounded-xl border border-border-app">
                                        <Box className="w-8 h-8 text-text-secondary" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-bg-surface text-text-secondary rounded-full border border-border-app">
                                        Coming Soon
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-secondary">
                                    Smart Converter
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Chuyển đổi đa định dạng file (PDF, IMG,
                                    JSON) nhanh chóng ngay trên trình duyệt.
                                </p>
                                <Button
                                    disabled
                                    variant="ghost"
                                    className="w-full border border-border-app"
                                >
                                    Đang phát triển...
                                </Button>
                            </motion.div>

                            {/* Upcoming Tool 2 */}
                            <motion.div
                                variants={item}
                                className="opacity-60 flex flex-col h-full bg-bg-surface/30 border border-border-app border-dashed rounded-2xl p-6"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-bg-app/50 rounded-xl border border-border-app">
                                        <Cpu className="w-8 h-8 text-text-secondary" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-bg-surface text-text-secondary rounded-full border border-border-app">
                                        Concept
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-secondary">
                                    Dev Utils
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Bộ công cụ tiện ích cho Developer: JSON
                                    Formatter, Base64 encoder, RegEx tester.
                                </p>
                                <Button
                                    disabled
                                    variant="ghost"
                                    className="w-full border border-border-app"
                                >
                                    Đang phát triển...
                                </Button>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* Footer */}
                    <footer className="mt-32 pt-12 border-t border-border-app text-center md:text-left">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-text-primary text-bg-app rounded-lg flex items-center justify-center font-bold font-mono">
                                    J
                                </div>
                                <div>
                                    <p className="font-bold text-lg">
                                        jellioOS{" "}
                                        <span className="text-xs font-normal text-text-secondary px-2 py-0.5 bg-bg-surface border border-border-app rounded ml-2">
                                            v5.3-alpha
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8 text-sm text-text-secondary">
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Về dự án
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Đóng góp
                                </a>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Quyền riêng tư
                                </a>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-border-app text-xs text-text-secondary">
                            <p>
                                © 2026 JellioOS Project. Mã nguồn mở theo giấy
                                phép MIT.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

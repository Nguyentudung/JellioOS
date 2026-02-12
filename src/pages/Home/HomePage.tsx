/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    QrCode,
    ArrowRight,
    Zap,
    Code2,
    FileText,
    Activity,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { JellioLogo, LogoText } from "../../components/ui/Logo";
import { Navbar } from "../../components/navigation/Navbar";

import { fadeInUp, staggerContainer } from "../../lib/motion";

export default function HomePage() {
    // Reuse variants from library
    const container = staggerContainer;
    const item = fadeInUp;

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
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500">
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
                            <Link to="https://github.com/nguyentudung">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-bg-surface/50 backdrop-blur-sm border border-border-app hover:bg-bg-surface text-text-secondary"
                                >
                                    <Code2 className="w-4 h-4 mr-2" />
                                    Mã nguồn mở
                                </Button>
                            </Link>
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
                                    <div className="p-3 bg-bg-app rounded-xl border border-border-app group-hover:border-primary/30 transition-colors">
                                        <QrCode className="w-8 h-8 text-primary" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                                        Sẵn sàng
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                                    QR Studio
                                    <span className="text-[10px] font-medium text-text-secondary px-1.5 py-0.5 bg-bg-app border border-border-app rounded">
                                        v0.0.1
                                    </span>
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Trình tạo mã QR cao cấp. Hỗ trợ tùy chỉnh
                                    logo, màu sắc gradient và định dạng vector
                                    (SVG).
                                </p>
                                <Link to="/tools/qr" className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                                    >
                                        Mở Công cụ{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Markdown Viewer Tool */}
                            <motion.div
                                variants={item}
                                className="group flex flex-col h-full bg-bg-surface border border-border-app rounded-2xl p-6 hover:border-accent transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-bg-app rounded-xl border border-border-app group-hover:border-primary/30 transition-colors">
                                        <FileText className="w-8 h-8 text-primary" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                                        Sẵn sàng
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                                    Markdown Viewer
                                    <span className="text-[10px] font-medium text-text-secondary px-1.5 py-0.5 bg-bg-app border border-border-app rounded">
                                        v1.0.0
                                    </span>
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Trình xem Markdown chuyên nghiệp. Hỗ trợ ToC
                                    tự động, syntax highlighting và giao diện
                                    documentation chuẩn mực.
                                </p>
                                <Link to="/tools/markdown" className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                                    >
                                        Mở Công cụ{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>

                            {/* Network Speedtest Tool */}
                            <motion.div
                                variants={item}
                                className="group flex flex-col h-full bg-bg-surface border border-border-app rounded-2xl p-6 hover:border-accent transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-bg-app rounded-xl border border-border-app group-hover:border-cyan-500/30 transition-colors">
                                        <Activity className="w-8 h-8 text-cyan-500" />
                                    </div>
                                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-500 rounded-full border border-cyan-500/20">
                                        Sẵn sàng
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-cyan-500 transition-colors flex items-center gap-2">
                                    Speedtest
                                    <span className="text-[10px] font-medium text-text-secondary px-1.5 py-0.5 bg-bg-app border border-border-app rounded">
                                        v1.0.0
                                    </span>
                                </h3>
                                <p className="text-text-secondary text-sm flex-1 mb-6">
                                    Kiểm tra tốc độ internet (Download, Upload,
                                    Ping) thời gian thực với độ chính xác cao và
                                    biểu đồ trực quan.
                                </p>
                                <Link to="/tools/speedtest" className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500"
                                    >
                                        Mở Công cụ{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </section>

                    {/* Footer */}
                    <footer className="mt-32 pt-12 border-t border-border-app text-center md:text-left">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                            <div className="flex flex-col gap-4">
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 justify-center md:justify-start group"
                                >
                                    <JellioLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
                                    <LogoText />
                                </Link>
                                <p className="text-sm text-text-secondary max-w-sm">
                                    Hệ sinh thái công cụ web tối giản, mã nguồn
                                    mở, hiện đại và mạnh mẽ. Tôn trọng quyền
                                    riêng tư và trải nghiệm người dùng.
                                </p>
                            </div>

                            <div className="flex flex-col items-center md:items-start gap-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                    Sản phẩm
                                </h4>
                                <a
                                    href="https://jellioedu.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-text-primary hover:text-primary transition-colors w-fit"
                                >
                                    Hệ thống luyện đề thi
                                </a>
                            </div>

                            <div className="flex flex-col items-center md:items-start gap-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                                    Duy trì dự án
                                </h4>
                                <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
                                    Bạn yêu thích JellioOS? Một{" "}
                                    <Link
                                        to="/donate"
                                        className="text-primary hover:text-primary/80 hover:underline font-bold"
                                    >
                                        ly cà phê
                                    </Link>{" "}
                                    nhỏ sẽ giúp mình có thêm động lực duy trì và
                                    phát triển dự án hoàn toàn miễn phí.
                                </p>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-border-app text-xs text-text-secondary flex flex-col md:flex-row justify-between items-center gap-4">
                            <p>
                                © 2026 JellioOS Project. Mã nguồn mở theo giấy
                                phép MIT.
                            </p>
                            <p className="flex items-center gap-1">
                                Built with{" "}
                                <span className="text-red-500">❤️</span> by{" "}
                                <a
                                    href="https://github.com/nguyentudung"
                                    className="hover:text-primary underline underline-offset-4"
                                >
                                    @nguyentudung
                                </a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

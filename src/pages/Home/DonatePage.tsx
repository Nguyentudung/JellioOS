/*
 * Copyright (c) 2026 JellioOS. All rights reserved.
 * Licensed under the MIT License.
 */

import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Coffee, Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Navbar } from "../../components/navigation/Navbar";
import QRBank from "../../assets/images/qr_bank.png";
import { fadeInUp, staggerContainer } from "../../lib/motion";

export default function DonatePage() {
    return (
        <>
            <Helmet>
                <title>Duy trì dự án - JellioOS</title>
                <meta
                    name="description"
                    content="Đóng góp và duy trì dự án JellioOS - Một ly cà phê nhỏ giúp chúng tôi phát triển hệ sinh thái tốt hơn."
                />
            </Helmet>

            <div className="min-h-screen bg-bg-app font-sans text-text-primary selection:bg-accent/30 selection:text-white overflow-x-hidden">
                <Navbar />

                {/* Background Grid */}
                <div className="fixed inset-0 bg-grid-premium opacity-40 pointer-events-none" />

                <div className="relative max-w-4xl mx-auto px-4 pt-32 pb-20 z-10">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={staggerContainer}
                        className="flex flex-col items-center text-center space-y-12"
                    >
                        <motion.div variants={fadeInUp}>
                            <Link to="/">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mb-8 text-text-secondary hover:text-text-primary"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay
                                    lại trang chủ
                                </Button>
                            </Link>
                            <div className="inline-flex p-4 bg-primary/10 rounded-2xl mb-6">
                                <Coffee className="w-12 h-12 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                                Mời mình một ly{" "}
                                <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500 text-italic">
                                    Cà phê
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
                                JellioOS là một dự án mã nguồn mở được xây dựng
                                với tất cả sự nhiệt huyết. Sự đóng góp của bạn
                                không chỉ là hỗ trợ tài chính, mà còn là nguồn
                                động lực to lớn để mình tiếp tục hoàn thiện các
                                công cụ miễn phí cho cộng đồng.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="w-full max-w-md bg-bg-surface border border-border-app rounded-3xl p-8 md:p-10 shadow-2xl shadow-accent/5 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-accent to-purple-500" />

                            <h2 className="text-xl font-bold mb-8 flex items-center justify-center gap-2">
                                <Heart className="w-5 h-5 text-red-500 fill-red-500" />{" "}
                                Quét mã ủng hộ
                            </h2>

                            <div className="aspect-square bg-white rounded-2xl p-4 border border-border-app mb-8 shadow-inner">
                                <img
                                    src={QRBank}
                                    alt="Mã QR Chuyển khoản"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm font-medium text-text-secondary">
                                    Nội dung chuyển khoản:
                                </p>
                                <div className="p-4 bg-bg-app rounded-xl border border-border-app font-mono text-primary font-bold">
                                    JELLIOOS DONATE
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="text-sm text-text-secondary italic"
                        >
                            Cảm ơn bạn rất nhiều vì đã đồng hành cùng JellioOS!
                            ❤️
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

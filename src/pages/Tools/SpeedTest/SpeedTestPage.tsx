import { useSpeedTest } from "./useSpeedTest";
import {
    RotateCcw,
    ArrowLeft,
    Activity,
    ArrowDown,
    ArrowUp,
    Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SpeedTestPage() {
    const { status, metrics, networkInfo, runTest } = useSpeedTest();

    const isRunning =
        status === "starting" ||
        status === "pinging" ||
        status === "downloading" ||
        status === "uploading";

    // Vietnamese Translation Map for Status
    const statusMap: Record<string, { label: string; color: string }> = {
        idle: { label: "Sẵn sàng", color: "bg-white" },
        starting: { label: "Đang khởi động", color: "bg-yellow-500" },
        pinging: { label: "Kiểm tra Ping", color: "bg-yellow-500" },
        downloading: { label: "Đang tải xuống", color: "bg-yellow-500" },
        uploading: { label: "Đang tải lên", color: "bg-yellow-500" },
        finished: { label: "Hoàn thành", color: "bg-green-500" },
    };

    const currentStatus = statusMap[status] || {
        label: status,
        color: "bg-red-500",
    };

    // Determine values to display
    const activeValue =
        status === "uploading" ? metrics.uploadSpeed : metrics.downloadSpeed;
    const activeLabel = status === "uploading" ? "TẢI LÊN" : "TẢI XUỐNG";

    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-black text-white font-sans selection:bg-cyan-500 selection:text-black">
            {/* Left Sidebar - Results & Info */}
            <div className="w-full md:w-[320px] lg:w-[360px] flex flex-col bg-[#0a0a0a] border-r border-[#222] h-full z-20 transition-all">
                <div className="h-16 flex items-center px-6 border-b border-[#222]">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="text-cyan-500" size={20} />
                        Thông số mạng
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Ping & Jitter */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[#333]">
                            <div className="flex items-center gap-3">
                                <Zap size={18} className="text-yellow-500" />
                                <span className="text-sm text-neutral-400">
                                    Ping
                                </span>
                            </div>
                            <div className="font-mono font-bold text-lg">
                                {metrics.ping}{" "}
                                <span className="text-xs text-neutral-600">
                                    ms
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#111] rounded-lg border border-[#333]">
                            <div className="flex items-center gap-3">
                                <Activity
                                    size={18}
                                    className="text-purple-500"
                                />
                                <span className="text-sm text-neutral-400">
                                    Jitter
                                </span>
                            </div>
                            <div className="font-mono font-bold text-lg">
                                {metrics.jitter}{" "}
                                <span className="text-xs text-neutral-600">
                                    ms
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-[#222] w-full" />

                    {/* Bandwidth Results */}
                    <div className="space-y-4">
                        <div
                            className={`p-4 rounded-xl border transition-all ${status === "downloading" ? "bg-cyan-500/10 border-cyan-500/50" : "bg-[#111] border-[#333]"}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <ArrowDown
                                    size={16}
                                    className={
                                        status === "downloading"
                                            ? "text-cyan-400"
                                            : "text-neutral-500"
                                    }
                                />
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                    TẢI XUỐNG
                                </span>
                            </div>
                            <div className="text-3xl font-mono font-bold">
                                {metrics.downloadSpeed.toFixed(2)}
                                <span className="text-sm font-normal text-neutral-600 ml-2">
                                    Mbps
                                </span>
                            </div>
                        </div>

                        <div
                            className={`p-4 rounded-xl border transition-all ${status === "uploading" ? "bg-purple-500/10 border-purple-500/50" : "bg-[#111] border-[#333]"}`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <ArrowUp
                                    size={16}
                                    className={
                                        status === "uploading"
                                            ? "text-purple-400"
                                            : "text-neutral-500"
                                    }
                                />
                                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                    TẢI LÊN
                                </span>
                            </div>
                            <div className="text-3xl font-mono font-bold">
                                {metrics.uploadSpeed.toFixed(2)}
                                <span className="text-sm font-normal text-neutral-600 ml-2">
                                    Mbps
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Status Info */}
                    <div className="mt-8 text-xs text-neutral-600 space-y-4 font-mono">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
                                Trạng thái
                            </span>
                            <div className="flex items-center gap-2 text-white">
                                <div
                                    className={`w-2 h-2 rounded-full ${currentStatus.color} ${isRunning ? "animate-pulse" : ""}`}
                                />
                                <span className="font-bold">
                                    {currentStatus.label.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[#222] text-[10px] text-neutral-700 text-center uppercase tracking-widest">
                    JellioOS Network Module v2.1
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 bg-black flex flex-col relative overflow-hidden bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black">
                {/* Header */}
                <header className="h-16 flex items-center justify-end px-6 border-b border-[#222] z-10 bg-black/50 backdrop-blur-md">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={16} /> Thoát
                    </Link>
                </header>

                {/* Center Stage */}
                <div className="flex-1 flex flex-col items-center justify-center relative p-10">
                    {/* Decorative Background Blob */}
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-all duration-1000 ${
                            status === "downloading"
                                ? "bg-cyan-500/20"
                                : status === "uploading"
                                  ? "bg-purple-500/20"
                                  : status === "finished"
                                    ? "bg-green-500/10"
                                    : "bg-transparent"
                        }`}
                    />

                    <div className="relative z-10 text-center">
                        {status === "idle" ? (
                            <button
                                onClick={runTest}
                                className="group relative w-48 h-48 flex items-center justify-center rounded-full bg-[#111] border border-[#333] hover:border-cyan-500 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
                            >
                                <div className="absolute inset-0 rounded-full border border-white/5" />
                                <div className="absolute inset-0 rounded-full border border-cyan-500/0 group-hover:border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                                <span className="text-3xl font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                                    BẮT ĐẦU
                                </span>
                            </button>
                        ) : (
                            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                <span
                                    className={`text-sm font-bold tracking-[0.2em] mb-4 uppercase ${
                                        status === "uploading"
                                            ? "text-purple-500"
                                            : status === "finished"
                                              ? "text-green-500"
                                              : "text-cyan-500"
                                    }`}
                                >
                                    {status === "finished"
                                        ? "HOÀN THÀNH"
                                        : activeLabel}
                                </span>

                                {status === "finished" ? (
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={runTest}
                                            className="px-8 py-4 bg-[#222] hover:bg-[#333] rounded-full font-bold flex items-center gap-3 transition-all group"
                                        >
                                            <RotateCcw
                                                className="group-hover:-rotate-180 transition-transform duration-500"
                                                size={20}
                                            />
                                            Đo lại
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="text-[80px] md:text-[120px] font-bold tracking-normal tabular-nums leading-none text-white drop-shadow-2xl">
                                            {activeValue.toFixed(2)}
                                        </div>
                                        <span className="text-2xl text-neutral-500 font-medium mt-4">
                                            Mbps
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Bottom Network Info Banner */}
                    <div className="absolute bottom-12 left-0 w-full flex justify-center px-10">
                        <div className="bg-[#111]/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-12 max-w-3xl w-full justify-between animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-[10px] text-neutral-500 font-bold tracking-widest">
                                    NHÀ CUNG CẤP
                                </span>
                                <span className="text-white font-bold truncate leading-tight">
                                    {networkInfo?.isp || "Đang lấy dữ liệu..."}
                                </span>
                            </div>

                            <div className="w-px h-8 bg-white/10" />

                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-[10px] text-neutral-500 font-bold tracking-widest">
                                    ĐỊA CHỈ IP
                                </span>
                                <span className="text-cyan-500 font-mono font-bold leading-tight">
                                    {networkInfo?.ip || "---.---.---.---"}
                                </span>
                            </div>

                            <div className="w-px h-8 bg-white/10" />

                            <div className="flex-1 flex flex-col gap-1">
                                <span className="text-[10px] text-neutral-500 font-bold tracking-widest">
                                    VỊ TRÍ
                                </span>
                                <span className="text-neutral-400 font-medium truncate leading-tight">
                                    {networkInfo?.location || "Đang định vị..."}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

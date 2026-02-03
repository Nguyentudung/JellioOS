import * as React from "react";
import type { QRState, QRDotsType, QRCornersType } from "../../types/qr";
import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import { Slider } from "../ui/Slider";
import { ColorPicker } from "../ui/ColorPicker";
import { X } from "lucide-react";
import JellioLogo from "../../assets/logo/Jellio.png";

interface SidebarProps {
    state: QRState;
    onChange: (updates: Partial<QRState>) => void;
}

const dotsOptions: { value: QRDotsType; label: string; icon: string }[] = [
    { value: "rounded", label: "Bo tròn (Rounded)", icon: "▢" },
    { value: "dots", label: "Chấm bi (Dots)", icon: "●" },
    { value: "square", label: "Vuông (Classic)", icon: "■" },
    { value: "extra-rounded", label: "Siêu bo góc", icon: "○" },
    { value: "classy", label: "Sang trọng", icon: "◆" },
];

const cornersOptions: { value: QRCornersType; label: string; icon: string }[] =
    [
        { value: "extra-rounded", label: "Góc Bo Tròn", icon: "◙" },
        { value: "dot", label: "Góc Tròn Hẳn", icon: "◉" },
        { value: "square", label: "Góc Vuông", icon: "▣" },
    ];

export function Sidebar({ state, onChange }: SidebarProps) {
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            onChange({ logo: ev.target?.result as string });
        };
        reader.readAsDataURL(file);
    };

    return (
        <aside className="w-full md:w-[400px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-30 shadow-xl h-full shrink-0">
            <header className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={JellioLogo}
                        alt="Jellio"
                        className="w-8 h-8 object-contain rounded-lg"
                        onError={(e) =>
                            (e.currentTarget.src =
                                "https://cdn-icons-png.flaticon.com/512/714/714390.png")
                        }
                    />
                    <h1 className="text-xl font-extrabold tracking-tight">
                        jellio<span className="text-blue-500 italic">OS</span>
                    </h1>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Content */}
                <div className="space-y-2">
                    <Label>Nội dung QR</Label>
                    <input
                        type="text"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:border-blue-500 outline-none transition-all dark:text-white"
                        placeholder="Nhập link..."
                        value={state.data}
                        onChange={(e) => onChange({ data: e.target.value })}
                    />
                </div>

                {/* Appearance */}
                <div className="space-y-3">
                    <Label>Giao diện</Label>
                    <div className="space-y-3">
                        <div className="relative z-50">
                            <Select
                                value={state.dots}
                                onChange={(v) =>
                                    onChange({ dots: v as QRDotsType })
                                }
                                options={dotsOptions}
                            />
                        </div>
                        <div className="relative z-40">
                            <Select
                                value={state.corners}
                                onChange={(v) =>
                                    onChange({ corners: v as QRCornersType })
                                }
                                options={cornersOptions}
                            />
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase">
                                    Khoảng cách lề (Margin)
                                </span>
                                <span className="text-[10px] font-mono text-blue-500 font-bold">
                                    {state.margin}px
                                </span>
                            </div>
                            <Slider
                                min={0}
                                max={50}
                                step={1}
                                value={state.margin}
                                onChange={(e) =>
                                    onChange({
                                        margin: parseInt(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Colors */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Label className="mb-0">Màu sắc</Label>
                        <div className="flex bg-slate-100 dark:bg-slate-800 rounded p-0.5">
                            <button
                                onClick={() => onChange({ isGradient: false })}
                                className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${!state.isGradient ? "bg-white dark:bg-slate-600 shadow-sm text-black dark:text-white" : "text-slate-400"}`}
                            >
                                Đơn
                            </button>
                            <button
                                onClick={() => onChange({ isGradient: true })}
                                className={`px-2 py-1 text-[10px] font-bold rounded transition-all ${state.isGradient ? "bg-white dark:bg-slate-600 shadow-sm text-black dark:text-white" : "text-slate-400"}`}
                            >
                                Grad
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <ColorPicker
                            color={state.color1}
                            onChange={(c) => onChange({ color1: c })}
                        />
                        <ColorPicker
                            color={state.color2}
                            onChange={(c) => onChange({ color2: c })}
                            disabled={!state.isGradient}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-400 mb-1 block">
                            Màu nền
                        </span>
                        <ColorPicker
                            color={state.bgColor}
                            onChange={(c) => onChange({ bgColor: c })}
                        />
                    </div>
                </div>

                {/* Logo */}
                <div className="space-y-2">
                    <Label>Logo Trung Tâm</Label>
                    <div className="flex gap-2 mb-3">
                        <label className="flex-1 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl h-10 flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-500 transition-colors">
                            {state.logo ? "Thay đổi Logo" : "Tải Logo Lên"}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleLogoUpload}
                            />
                        </label>
                        {state.logo && (
                            <button
                                onClick={() => onChange({ logo: null })}
                                className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div
                        className={`transition-opacity duration-200 ${!state.logo ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">
                                Khoảng cách Logo
                            </span>
                            <span className="text-[10px] font-mono text-blue-500 font-bold">
                                {state.logoMargin}px
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={20}
                            step={1}
                            value={state.logoMargin}
                            onChange={(e) =>
                                onChange({
                                    logoMargin: parseInt(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[10px] text-center text-slate-400 font-bold tracking-widest">
                jellioOS Studio v5.2
            </div>
        </aside>
    );
}

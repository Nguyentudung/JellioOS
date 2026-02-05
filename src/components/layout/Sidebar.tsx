import * as React from "react";
import type { QRState, QRDotsType, QRCornersType } from "../../types/qr";
import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import { Slider } from "../ui/Slider";
import { MultiColorPicker } from "../ui/MultiColorPicker";
import { X } from "lucide-react";

interface SidebarProps {
    state: QRState;
    onChange: (updates: Partial<QRState>) => void;
}
const dotsOptions: { value: QRDotsType; label: string; icon: string }[] = [
    { value: "rounded", label: "Bo tròn", icon: "▢" },
    { value: "dots", label: "Chấm bi", icon: "●" },
    { value: "square", label: "Vuông", icon: "■" },
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
        <aside className="w-full md:w-[400px] bg-bg-surface border-r border-border-app flex flex-col z-30 shadow-none h-full shrink-0">
            {/* Minimal Header / Title for the Tool Panel */}
            <div className="h-16 flex items-center px-6 border-b border-border-app shrink-0">
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Cấu hình QR
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Content */}
                <div className="space-y-2">
                    <Label>Nội dung QR</Label>
                    <input
                        type="text"
                        className="w-full bg-bg-app border border-border-app rounded-md px-3 py-2.5 text-sm font-medium text-text-primary focus:border-primary outline-none transition-all placeholder:text-text-secondary"
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

                        <div className="pt-2 border-t border-border-app">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold text-text-secondary uppercase">
                                    Khoảng cách lề
                                </span>
                                <span className="text-[10px] font-mono text-primary font-bold">
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

                <div className="space-y-6 pt-4 border-t border-border-app">
                    <MultiColorPicker
                        label="Màu sắc (QR)"
                        colors={state.qrColors}
                        onChangeColors={(colors) =>
                            onChange({ qrColors: colors })
                        }
                        gradientType={state.qrGradientType}
                        onChangeType={(type) =>
                            onChange({ qrGradientType: type })
                        }
                        rotation={state.qrRotation}
                        onChangeRotation={(rot) =>
                            onChange({ qrRotation: rot })
                        }
                    />

                    <div className="space-y-4">
                        <MultiColorPicker
                            label="Màu nền"
                            colors={state.bgColors}
                            onChangeColors={(colors) =>
                                onChange({ bgColors: colors })
                            }
                            gradientType={state.bgGradientType}
                            onChangeType={(type) =>
                                onChange({ bgGradientType: type })
                            }
                            rotation={state.bgRotation}
                            onChangeRotation={(rot) =>
                                onChange({ bgRotation: rot })
                            }
                        />
                    </div>
                </div>
                {/* Logo */}
                <div className="space-y-2">
                    <Label>Logo Trung Tâm</Label>
                    <div className="flex gap-2 mb-3">
                        <label className="flex-1 border border-dashed border-border-app rounded-lg h-10 flex items-center justify-center cursor-pointer hover:bg-bg-app text-xs font-medium text-text-secondary transition-colors">
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
                                className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div
                        className={`transition-opacity duration-200 ${!state.logo ? "opacity-50 pointer-events-none" : ""}`}
                    >
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-bold text-text-secondary uppercase">
                                Khoảng cách Logo
                            </span>
                            <span className="text-[10px] font-mono text-primary font-bold">
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

            <div className="p-3 border-t border-border-app bg-bg-app text-[10px] text-center text-text-secondary font-bold tracking-widest">
                jellioOS Studio v5.2
            </div>
        </aside>
    );
}

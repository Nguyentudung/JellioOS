import * as React from "react";
import { Link } from "react-router-dom";
import { Undo, Redo, Shuffle, Download, ArrowLeft, Scan } from "lucide-react";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";

interface HeaderProps {
    onUndo: () => void;
    onRedo: () => void;
    onRandomize: () => void;
    onExport: (ext: "png" | "svg", size: number) => void;
    canUndo: boolean;
    canRedo: boolean;
    bgCornerRadius: number;
    onChangeCornerRadius: (value: number) => void;
}

export function Header({
    onUndo,
    onRedo,
    onRandomize,
    onExport,
    canUndo,
    canRedo,
    bgCornerRadius,
    onChangeCornerRadius,
}: HeaderProps) {
    const [showExport, setShowExport] = React.useState(false);
    const [exportSize, setExportSize] = React.useState(1000);
    const exportRef = React.useRef<HTMLDivElement>(null);

    const [showRadius, setShowRadius] = React.useState(false);
    const radiusRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                exportRef.current &&
                !exportRef.current.contains(event.target as Node)
            ) {
                setShowExport(false);
            }
            if (
                radiusRef.current &&
                !radiusRef.current.contains(event.target as Node)
            ) {
                setShowRadius(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleExport = (ext: "png" | "svg") => {
        onExport(ext, exportSize);
        setShowExport(false);
    };

    return (
        <div className="h-16 border-b border-border-app bg-bg-app/80 backdrop-blur flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    className="h-10 w-10 p-0"
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Hoàn tác"
                >
                    <Undo className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-10 w-10 p-0"
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Làm lại"
                >
                    <Redo className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-border-app mx-1"></div>

                <div className="relative" ref={radiusRef}>
                    <Button
                        variant="secondary"
                        className={`h-10 w-10 p-0 ${showRadius ? "bg-primary/10 text-primary border-primary" : ""}`}
                        onClick={() => setShowRadius(!showRadius)}
                        title="Bo góc nền"
                    >
                        <Scan className="w-4 h-4" />
                    </Button>
                    {showRadius && (
                        <div className="absolute top-[calc(100%+10px)] left-0 w-[200px] bg-bg-surface border border-border-app rounded-xl shadow-xl p-4 z-50 animate-fade-in-up">
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-text-secondary uppercase">
                                        Bo góc (%)
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={Math.round(
                                            bgCornerRadius * 100,
                                        ).toString()}
                                        onChange={(e) => {
                                            // Strip everything except numbers
                                            const raw = e.target.value.replace(
                                                /[^0-9]/g,
                                                "",
                                            );
                                            // Handle empty string as 0, and corectly handle leading zeros
                                            const val = Math.min(
                                                50,
                                                Math.max(
                                                    0,
                                                    parseInt(raw, 10) || 0,
                                                ),
                                            );
                                            onChangeCornerRadius(val / 100);
                                        }}
                                        className="w-full bg-bg-app border border-border-app rounded-sm px-3 py-2 text-sm font-bold text-text-primary focus:border-primary outline-none transition-colors"
                                        placeholder="0"
                                        onFocus={(e) => e.target.select()}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-secondary pointer-events-none">
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    variant="secondary"
                    className="h-10 px-5 gap-2 text-purple-600 dark:text-purple-400 font-bold"
                    onClick={onRandomize}
                >
                    <Shuffle className="w-4 h-4" />
                    Ngẫu nhiên
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    variant="secondary"
                    asChild
                    className="h-10 w-32 font-bold"
                >
                    <Link to="/">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Thoát</span>
                    </Link>
                </Button>

                <div className="relative" ref={exportRef}>
                    <Button
                        variant="primary"
                        className="h-10 w-32 font-bold"
                        onClick={() => setShowExport(!showExport)}
                    >
                        <Download className="w-4 h-4" />
                        <span>Xuất QR</span>
                    </Button>

                    {showExport && (
                        <div className="absolute top-[calc(100%+10px)] right-0 w-[280px] bg-bg-surface border border-border-app rounded-lg shadow-none p-4 z-50 animate-fade-in-up">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-text-secondary uppercase">
                                            Kích thước
                                        </span>
                                        <span className="text-xs font-mono font-bold text-primary">
                                            {exportSize}px
                                        </span>
                                    </div>
                                    <Slider
                                        min={500}
                                        max={4000}
                                        step={100}
                                        value={exportSize}
                                        onChange={(e) =>
                                            setExportSize(
                                                parseInt(e.target.value),
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-text-secondary uppercase mb-2 block">
                                        Định dạng
                                    </span>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleExport("png")}
                                            className="flex flex-col items-center justify-center p-3 rounded-md border border-border-app bg-bg-app hover:border-primary hover:bg-primary/5 transition-all group"
                                        >
                                            <span className="text-xs font-black text-text-primary group-hover:text-primary">
                                                PNG
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleExport("svg")}
                                            className="flex flex-col items-center justify-center p-3 rounded-md border border-border-app bg-bg-app hover:border-primary hover:bg-primary/5 transition-all group"
                                        >
                                            <span className="text-xs font-black text-text-primary group-hover:text-primary">
                                                SVG
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import * as React from "react";
import { Undo, Redo, Shuffle, Download, Sun, Moon } from "lucide-react";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";

interface HeaderProps {
    onUndo: () => void;
    onRedo: () => void;
    onRandomize: () => void;
    onExport: (ext: "png" | "svg", size: number) => void;
    theme: "light" | "dark";
    toggleTheme: () => void;
    canUndo: boolean;
    canRedo: boolean;
}

export function Header({
    onUndo,
    onRedo,
    onRandomize,
    onExport,
    theme,
    toggleTheme,
    canUndo,
    canRedo,
}: HeaderProps) {
    const [showExport, setShowExport] = React.useState(false);
    const [exportSize, setExportSize] = React.useState(1000);
    const exportRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                exportRef.current &&
                !exportRef.current.contains(event.target as Node)
            ) {
                setShowExport(false);
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
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur flex items-center justify-between px-6 z-20">
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Undo"
                >
                    <Undo className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Redo"
                >
                    <Redo className="w-4 h-4" />
                </Button>
                <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>
                <Button
                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    size="sm"
                    onClick={onRandomize}
                >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Ngẫu nhiên
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <Sun className="w-4 h-4" />
                    ) : (
                        <Moon className="w-4 h-4" />
                    )}
                </Button>

                <div className="relative" ref={exportRef}>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => setShowExport(!showExport)}
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Xuất QR
                    </Button>

                    {showExport && (
                        <div className="absolute top-[calc(100%+10px)] right-0 w-[280px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in-up">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-slate-500 uppercase">
                                            Kích thước
                                        </span>
                                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
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
                                    <span className="text-xs font-bold text-slate-500 uppercase mb-2 block">
                                        Định dạng
                                    </span>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => handleExport("png")}
                                            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
                                        >
                                            <span className="text-xs font-black text-slate-700 dark:text-slate-200 group-hover:text-blue-600">
                                                PNG
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleExport("svg")}
                                            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
                                        >
                                            <span className="text-xs font-black text-slate-700 dark:text-slate-200 group-hover:text-blue-600">
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

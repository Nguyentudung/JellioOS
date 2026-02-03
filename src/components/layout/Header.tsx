import * as React from "react";
import { Link } from "react-router-dom";
import { Undo, Redo, Shuffle, Download, ArrowLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";

interface HeaderProps {
    onUndo: () => void;
    onRedo: () => void;
    onRandomize: () => void;
    onExport: (ext: "png" | "svg", size: number) => void;
    canUndo: boolean;
    canRedo: boolean;
}

export function Header({
    onUndo,
    onRedo,
    onRandomize,
    onExport,
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
        <div className="h-16 border-b border-border-app bg-bg-app/80 backdrop-blur flex items-center justify-between px-6 z-20">
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
                <div className="w-px h-6 bg-border-app mx-1"></div>
                <Button
                    className="bg-bg-surface border border-border-app text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    size="sm"
                    onClick={onRandomize}
                >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Ngẫu nhiên
                </Button>
            </div>

            <div className="flex items-center gap-3">
                <Link to="/">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-text-secondary hover:text-text-primary gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Thoát</span>
                    </Button>
                </Link>

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
                        <div className="absolute top-[calc(100%+10px)] right-0 w-[280px] bg-bg-surface border border-border-app rounded-lg shadow-none p-4 z-50 animate-fade-in-up">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-text-secondary uppercase">
                                            Kích thước
                                        </span>
                                        <span className="text-xs font-mono font-bold text-accent">
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
                                            className="flex flex-col items-center justify-center p-3 rounded-md border border-border-app bg-bg-app hover:border-accent hover:bg-accent/5 transition-all group"
                                        >
                                            <span className="text-xs font-black text-text-primary group-hover:text-accent">
                                                PNG
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleExport("svg")}
                                            className="flex flex-col items-center justify-center p-3 rounded-md border border-border-app bg-bg-app hover:border-accent hover:bg-accent/5 transition-all group"
                                        >
                                            <span className="text-xs font-black text-text-primary group-hover:text-accent">
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

import { Plus, X, RotateCw } from "lucide-react";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { Label } from "./Label";
import { cn } from "../../lib/utils";

interface MultiColorPickerProps {
    colors: string[];
    onChangeColors: (colors: string[]) => void;

    gradientType: "linear" | "radial";
    onChangeType: (type: "linear" | "radial") => void;

    rotation: number;
    onChangeRotation: (deg: number) => void;

    label?: string;
}

export function MultiColorPicker({
    colors,
    onChangeColors,
    gradientType,
    onChangeType,
    rotation,
    onChangeRotation,
    label,
}: MultiColorPickerProps) {
    const handleAddColor = () => {
        const lastColor = colors[colors.length - 1];
        onChangeColors([...colors, lastColor || "#000000"]);
    };

    const handleRemoveColor = (index: number) => {
        if (colors.length <= 1) return;
        const newColors = colors.filter((_, i) => i !== index);
        onChangeColors(newColors);
    };

    const handleUpdateColor = (index: number, newColor: string) => {
        const newColors = [...colors];
        newColors[index] = newColor;
        onChangeColors(newColors);
    };

    return (
        <div className="space-y-3">
            {/* Header / Label */}
            <div className="flex items-center justify-between">
                {label && <Label>{label}</Label>}
                <div className="flex gap-1">
                    {/* Only show Add button here? Or at end of list? End of list is better UX */}
                </div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-4 gap-2">
                {colors.map((color, index) => (
                    <div key={index} className="relative group">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border-app shadow-sm hover:scale-105 transition-transform bg-bg-app">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) =>
                                    handleUpdateColor(index, e.target.value)
                                }
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 m-0 border-0 cursor-pointer"
                            />
                        </div>
                        {colors.length > 1 && (
                            <button
                                onClick={() => handleRemoveColor(index)}
                                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 hover:scale-110"
                                title="Xóa màu"
                            >
                                <X size={10} strokeWidth={3} />
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Button */}
                <button
                    onClick={handleAddColor}
                    className="w-full aspect-square rounded-lg border border-dashed border-border-app flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
                    title="Thêm màu"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Gradient Controls (Only if > 1 color) */}
            {colors.length > 1 && (
                <div className="pt-3 border-t border-border-app space-y-3 animate-fade-in-up">
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant={
                                gradientType === "linear"
                                    ? "secondary"
                                    : "ghost"
                            }
                            className={cn(
                                "flex-1 text-xs h-8",
                                gradientType === "linear"
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "",
                            )}
                            onClick={() => onChangeType("linear")}
                        >
                            Linear
                        </Button>
                        <Button
                            size="sm"
                            variant={
                                gradientType === "radial"
                                    ? "secondary"
                                    : "ghost"
                            }
                            className={cn(
                                "flex-1 text-xs h-8",
                                gradientType === "radial"
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "",
                            )}
                            onClick={() => onChangeType("radial")}
                        >
                            Radial
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-text-secondary uppercase flex items-center gap-1">
                                <RotateCw size={10} /> Góc xoay ({rotation}°)
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={360}
                            step={5}
                            value={rotation}
                            onChange={(e) =>
                                onChangeRotation(parseInt(e.target.value))
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

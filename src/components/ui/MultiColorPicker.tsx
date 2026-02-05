import { useState, useEffect, useRef } from "react";
import { Plus, X, RotateCw, GripVertical } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { Button } from "./Button";
import { Slider } from "./Slider";
import { Label } from "./Label";
import { cn } from "../../lib/utils";

interface ColorItem {
    id: string;
    value: string;
}

interface MultiColorPickerProps {
    colors: string[];
    onChangeColors: (colors: string[]) => void;

    gradientType: "linear" | "radial";
    onChangeType: (type: "linear" | "radial") => void;

    rotation: number;
    onChangeRotation: (deg: number) => void;

    label?: string;
}

function DraggableColorItem({
    item,
    onRemove,
    onUpdate,
    onCommit,
    onDragEnd,
}: {
    item: ColorItem;
    onRemove: () => void;
    onUpdate: (val: string) => void;
    onCommit: () => void;
    onDragEnd: () => void;
}) {
    const controls = useDragControls();
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={controls}
            onDragEnd={onDragEnd}
            className="relative group"
        >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border-app shadow-sm transition-all bg-bg-app hover:border-primary/50 group-active:scale-95">
                {/* Color Display / Click to Select */}
                <div
                    className="w-full h-full cursor-pointer"
                    style={{ backgroundColor: item.value }}
                    onClick={() => inputRef.current?.click()}
                />

                <input
                    ref={inputRef}
                    type="color"
                    value={item.value}
                    onChange={(e) => onUpdate(e.target.value)}
                    onBlur={onCommit}
                    className="sr-only"
                />

                {/* Drag Handle - The ONLY way to drag */}
                <div
                    onPointerDown={(e) => controls.start(e)}
                    className="absolute inset-x-0 bottom-0 h-1/3 flex items-center justify-center bg-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
                >
                    <GripVertical size={14} className="text-white" />
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-10 hover:scale-110"
                title="Xóa màu"
            >
                <X size={10} strokeWidth={3} />
            </button>
        </Reorder.Item>
    );
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
    const [localItems, setLocalItems] = useState<ColorItem[]>([]);

    useEffect(() => {
        setLocalItems((prev) => {
            const isSame =
                prev.length === colors.length &&
                prev.every((item, i) => item.value === colors[i]);
            if (isSame) return prev;

            return colors.map((c, i) => ({
                id: prev[i]?.id || `color-${i}-${Math.random()}`,
                value: c,
            }));
        });
    }, [colors]);

    const handleAddColor = () => {
        const lastColor = colors[colors.length - 1] || "#000000";
        onChangeColors([...colors, lastColor]);
    };

    const handleRemoveColor = (id: string) => {
        const newItems = localItems.filter((it) => it.id !== id);
        if (newItems.length === 0) return;
        setLocalItems(newItems);
        onChangeColors(newItems.map((it) => it.value));
    };

    const handleUpdateColor = (id: string, newValue: string) => {
        const newItems = localItems.map((it) =>
            it.id === id ? { ...it, value: newValue } : it,
        );
        setLocalItems(newItems);
    };

    const handleCommitColors = () => {
        onChangeColors(localItems.map((it) => it.value));
    };

    const handleDragEnd = () => {
        onChangeColors(localItems.map((it) => it.value));
    };

    const handleReorder = (newOrder: ColorItem[]) => {
        setLocalItems(newOrder);
        // Do NOT call onChangeColors here to prevent re-render during drag
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                {label && <Label>{label}</Label>}
            </div>

            <div className="grid grid-cols-4 gap-2">
                <Reorder.Group
                    axis="x"
                    values={localItems}
                    onReorder={handleReorder}
                    className="contents"
                >
                    {localItems.map((item) => (
                        <DraggableColorItem
                            key={item.id}
                            item={item}
                            onRemove={() => handleRemoveColor(item.id)}
                            onUpdate={(val) => handleUpdateColor(item.id, val)}
                            onCommit={handleCommitColors}
                            onDragEnd={handleDragEnd}
                        />
                    ))}
                </Reorder.Group>

                <button
                    onClick={handleAddColor}
                    className="aspect-square rounded-lg border border-dashed border-border-app flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all"
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

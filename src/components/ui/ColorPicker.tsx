import { cn } from "../../lib/utils";

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    className?: string;
    disabled?: boolean;
}

export function ColorPicker({
    color,
    onChange,
    className,
    disabled,
}: ColorPickerProps) {
    return (
        <div
            className={cn(
                "relative w-full h-10 rounded-xl overflow-hidden border-2 border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all hover:scale-[1.02]",
                disabled && "opacity-50 pointer-events-none",
                className,
            )}
        >
            <div
                className="w-full h-full absolute inset-0 pointer-events-none"
                style={{ backgroundColor: color }}
            />
            <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={disabled}
            />
        </div>
    );
}

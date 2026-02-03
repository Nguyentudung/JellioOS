import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

export interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode | string;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find((o) => o.value === value) || options[0];

    return (
        <div className={cn("relative w-full", className)} ref={containerRef}>
            <div
                className="flex items-center justify-between px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-white dark:hover:bg-slate-700 transition-all select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {selectedOption.icon && (
                        <span className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 font-bold text-[10px] flex items-center justify-center">
                            {selectedOption.icon}
                        </span>
                    )}
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {selectedOption.label}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-slate-400 transition-transform",
                        isOpen && "rotate-180",
                    )}
                />
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 shadow-xl z-50 animate-fade-in-up max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm font-medium",
                                option.value === value
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700",
                            )}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon && (
                                <span className="w-5 h-5 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[10px]">
                                    {option.icon}
                                </span>
                            )}
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

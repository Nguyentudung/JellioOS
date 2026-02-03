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
                className="flex items-center justify-between px-3 py-2.5 bg-bg-app border border-border-app rounded-lg cursor-pointer hover:border-accent transition-all select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    {selectedOption.icon && (
                        <span className="w-5 h-5 rounded bg-accent/10 text-accent font-bold text-[10px] flex items-center justify-center">
                            {selectedOption.icon}
                        </span>
                    )}
                    <span className="text-sm font-bold text-text-primary">
                        {selectedOption.label}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "w-4 h-4 text-text-secondary transition-transform",
                        isOpen && "rotate-180",
                    )}
                />
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-bg-surface border border-border-app rounded-lg p-1.5 shadow-none z-50 animate-fade-in-up max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors text-sm font-medium",
                                option.value === value
                                    ? "bg-primary/10 text-primary"
                                    : "text-text-secondary hover:text-text-primary hover:bg-bg-app",
                            )}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon && (
                                <span className="w-5 h-5 rounded bg-bg-app border border-border-app flex items-center justify-center text-[10px]">
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

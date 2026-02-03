import * as React from "react";
import { cn } from "../../lib/utils";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="range"
                ref={ref}
                className={cn(
                    "w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer",
                    "accent-blue-600 dark:accent-blue-500", // Tailwind accent utility handles thumb color well enough in modern browsers
                    // But we want the specific styling from the HTML, so we rely on global CSS or specific classes
                    // The global CSS I added earlier targets input[type=range] generally, so basic classes here are fine for positioning.
                    className,
                )}
                {...props}
            />
        );
    },
);
Slider.displayName = "Slider";

export { Slider };

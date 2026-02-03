import * as React from "react";
import { cn } from "../../lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ className, children, ...props }: LabelProps) {
    return (
        <label
            className={cn(
                "text-xs font-bold text-slate-400 uppercase block mb-2 tracking-wide",
                className,
            )}
            {...props}
        >
            {children}
        </label>
    );
}

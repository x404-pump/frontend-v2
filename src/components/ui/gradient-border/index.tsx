import clsx from "clsx";
import { PropsWithChildren } from "react";

interface GradientBorderProps {
    className?: string;
    borderWidth?: number;
}

export function GradientBorder({ children, className, borderWidth = 1 }: PropsWithChildren<GradientBorderProps>) {
    return (
        <div className={clsx(
            'overflow-hidden',
            className,
        )}
            style={{
                padding: `${borderWidth}px`,
            }}
        >
            {children}
        </div>
    );
}
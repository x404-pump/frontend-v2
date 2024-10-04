import clsx from "clsx";
import { ContainerProps } from "./type";

interface ResponsiveContainerProps extends ContainerProps {
}
export function ResponsiveContainer({ children, className, ...props }: ResponsiveContainerProps) {
    return (
        <div
            className={clsx(
                'grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3',
                className
            )}
        >
            {children}
        </div>
    )
}
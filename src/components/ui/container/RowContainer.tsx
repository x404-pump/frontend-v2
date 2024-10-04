import clsx from "clsx";
import { ContainerProps } from "./type";

interface RowContainerProps extends ContainerProps {
}

export function RowContainer({ children, className,  ...props }: RowContainerProps) {
    return (
        <div
            className={clsx(
                "flex flex-row gap-4",
                className
            )}
        >
            {children}
        </div>
    )
}
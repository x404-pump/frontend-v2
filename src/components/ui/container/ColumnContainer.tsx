import clsx from "clsx";
import {ContainerProps} from './type'

interface ColumnContainerProps extends ContainerProps {
}

export function ColumnContainer({ children, className,  }: ColumnContainerProps) {
    return (
        <div
            className={clsx(
                "flex flex-col gap-4",
                className
            )}
        >
            {children}
        </div>
    )
}
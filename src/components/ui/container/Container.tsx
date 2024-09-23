import clsx from "clsx";
import { ContainerProps } from "./type";

export function Container(props: ContainerProps) {
    const { title, children, className } = props;
    return (
        <div className={clsx(
            "flex flex-col gap-4",
            className
        )}>
            <h6 className="text-lg md:text-2xl text-foreground font-semibold capitalize">{title}</h6>
            {children}
        </div>
    )
}
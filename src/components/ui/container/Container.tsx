import { ContainerProps } from "./type";

export function Container(props: ContainerProps) {
    const { title, children } = props;
    return (
        <div className="flex flex-col gap-4">
            <h6 className="text-lg md:text-2xl text-foreground font-semibold capitalize">{title}</h6>
            {children}
        </div>
    )
}
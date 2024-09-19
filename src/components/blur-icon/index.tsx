import clsx from "clsx";

interface BlurIconProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    classNames?: {
        blur?: string;
        wrapper?: string;
    }
}

export default function BlurIcon({ ...props }: BlurIconProps) {
    return (
        <div className={clsx(
            "relative bg-foreground-50/25 p-4 rounded-full border border-default/25",
            props.classNames?.wrapper
        )}>
            <div className={clsx(
                "bg-default z-0 aspect-square w-8 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl",
                props.classNames?.blur
            )} />
            {props.icon}
        </div>
    );

}
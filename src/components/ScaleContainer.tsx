import clsx from "clsx";

interface ScaleContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export default function ScaleContainer({ children, className }: ScaleContainerProps) {
    return (
        <div
            className={clsx(
                'grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                className
            )}
        >
            {children}
        </div>
    )
}
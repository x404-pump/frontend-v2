import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function ScaleContainer({ children }: PropsWithChildren) {
    return (
        <div
            className={clsx(
                'grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'
            )}
        >
            {children}
        </div>
    )
}
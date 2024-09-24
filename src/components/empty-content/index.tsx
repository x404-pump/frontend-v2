import { DashedLine02Icon } from "hugeicons-react";

interface EmptyContentProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
}
export default function EmptyContent({ content = 'No content found', ...props }: EmptyContentProps) {
    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full h-full rounded-full" {...props}>
            <div className="relative bg-foreground-50/25 p-4 rounded-full border border-default/25">
                <div className="bg-primary z-0 aspect-square w-8 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-2xl" />
                <DashedLine02Icon className="text-foreground-500 z-10" size={16} />
            </div>
            <p className="text-foreground-300 text-center text-base">
                {content}
            </p>
            {props.children}
        </div>
    );
}

interface EmptyContentProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
}
export default function EmptyContent({ content = 'Empty', ...props }: EmptyContentProps) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full rounded-full" {...props}>
            <p className="text-foreground-500 text-center text-base">
                {content}
            </p>
            {props.children}
        </div>
    );
}
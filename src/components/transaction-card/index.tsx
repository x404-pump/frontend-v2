import { timeAgo } from "@/lib";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

interface TransactionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    from?: string | null;
    to?: string | null;
    tag?: React.ReactNode;
    time: Date | string | number | null;
}
export function TransactionCard(props: TransactionCardProps) {
    const {
        from,
        to,
        tag,
        time,
        ...rest
    } = props;

    return (
        <div className="min-w-fit flex flex-row gap-2 p-4 bg-foreground-50 rounded-small border-2 border-default-200 items-center justify-between">
            <p className="flex flex-col gap-0">
                <span className="text-tiny text-foreground-500">From</span>
                <span
                    className="text-base text-foreground-900 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        try {
                            copy(props.from!);
                            toast.success("Copied to clipboard", {
                                type: "success",
                            });
                        } catch (error) {
                            toast.error("Failed to copy address", {
                                type: "error",
                            });
                        }
                    }}
                >
                    <Tooltip
                        content={props.from}
                        placement="top"
                    >
                        {props.from?.slice(0, 5) || "_"}
                    </Tooltip>
                </span>
            </p>
            <p className="flex flex-col gap-0">
                <span className="text-tiny text-foreground-500">To</span>
                <span
                    className="text-base text-foreground-900 cursor-pointer"
                    role="button"
                    onClick={() => {
                        try {
                            copy(props.to!);
                            toast.success("Copied to clipboard", {
                                type: "success",
                            });
                        } catch (error) {
                            toast.error("Failed to copy address", {
                                type: "error",
                            });
                        }
                    }}
                >
                    <Tooltip
                        content={props.to}
                        placement="top"
                    >
                        {props.to?.slice(0, 5) || '_'}
                    </Tooltip>
                </span>
            </p>
            {tag &&
                <Chip
                    color="default"
                    radius="full"
                    size="sm"
                    classNames={{
                        content: "text-foreground-900",
                        base: "bg-foreground-100"
                    }}
                >
                    {props.tag || "-"}
                </Chip>
            }
            <p className="text-xs text-foreground-500">
                • {timeAgo(new Date(time!))}
            </p>
        </div>
    );
}
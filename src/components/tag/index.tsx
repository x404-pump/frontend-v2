import clsx from "clsx";
import { GradientBorder } from "../ui";
import { SaleTag02Icon } from "hugeicons-react";
import numeral from "numeral";

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
    price: string;
    unit?: string;
    fullWidth?: boolean;
}
export function PriceTag(props: PriceTagProps) {
    const { price, unit, className, fullWidth = false, ...rest } = props;

    return (
        <GradientBorder
            className={clsx(
                "bg-gradient-to-t from-[#CFA4FA] via-[#FFFFFF] to-[#9E3CFF]/25 rounded-small p-[2px] w-full",
                !fullWidth && "max-w-24",
                className
            )}
        >
            <div
                className={clsx(
                    'flex flex-row items-center justify-start gap-2 rounded-small bg-primary p-1 w-full',
                    className
                )}
                {...rest}
            >
                <span className="rounded-small bg-primary-700 p-1">
                    <SaleTag02Icon size={16} className="text-primary-foreground" />
                </span>
                <p className="text-xs font-semibold text-foreground-900">
                    {numeral(price).format("0,0.00")} {unit}
                </p>
            </div>
        </GradientBorder>
    );
}
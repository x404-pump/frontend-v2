import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

export interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
    name?: string;
    type?: string;
    content?: string;
    value?: string;
    direction?: 'row' | 'column';
    copyable?: boolean;
    classNames?: {
        name?: string;
        value?: string;
    }
}
export function Field(props: FieldProps) {
    const { name, type = 'text', value, direction = 'column', copyable = false, content, ...rest } = props;

    return (
        <div
            className={
                clsx(
                    'flex items-start w-fit',
                    direction === 'row' ? 'flex-row gap-2' : 'flex-col gap-1',
                    props.className
                )}
        >
            <p
                className={
                    clsx(
                        'text-base text-foreground-500 w-fit text-nowrap',
                        props.classNames?.name
                    )}>
                {name}
            </p>
            <button
                className={clsx(
                    'text-base text-foreground-900 cursor-pointer w-fit',
                    props.classNames?.value
                )}
                onClick={() => {
                    if (copyable) {
                        try {
                            if (!value) return;
                            copy(value);
                            toast.success('Copied to clipboard');
                        } catch (error) {
                            toast.error('Failed to copy to clipboard');
                        }
                    }
                }}
            >
                {content || value}
            </button>
        </div>
    )
}
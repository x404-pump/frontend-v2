import { Image } from "@nextui-org/image";
import clsx from "clsx";
import React from "react";
import { MdPreview } from "react-icons/md";

interface CollectionDetailAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    collectionName?: string;
    description?: string;
    imageSrc?: string;
}

const FieldArea = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-row justify-between gap-4 items-center w-full">
            <span className="text-sm text-default-500">{label}</span>
            <span className="text-base font-semibold text-foreground-900">{value}</span>
        </div>
    );
}

export default function CollectionDetailArea({ collectionName, description, imageSrc, ...props }: CollectionDetailAreaProps) {
    const [image, setImage] = React.useState<string | null>(null);
    
    const items = [
        {
            label: 'Collection Name',
            value: collectionName,
        },
        {
            label: 'Collection Description',
            value: description,
        }

    ];

    React.useEffect(() => {
        if(imageSrc) {
            setImage(imageSrc);
        }
    }, [imageSrc]);

    return (
        <div
            className={clsx(
                "flex flex-col gap-4 items-start w-full h-full p-8 rounded-[32px] bg-foreground-100 shadow",
                props.className
            )}
        >
            <h4 className="text-lg md:text-2xl font-semibold text-foreground-900">Collection Detail</h4>
            {items.map((item, index) => (
                <FieldArea key={index} label={item.label} value={item.value || 'N/A'} />
            ))}
            {image ?
                <Image
                    src={image}
                    alt="Collection Image"
                    width={"100%"}
                    height={'auto'}
                    isLoading={image ? false : true}
                    className="aspect-video"
                    classNames={{
                        wrapper: "w-full rounded-3xl overflow-hidden",
                    }}
                /> : 
                <div className="p-8 w-full h-full flex flex-col items-center justify-center bg-primary rounded-[24px]">
                    <MdPreview size={64} className="text-primary-200" />
                    <p className="text-center text-sm text-primary-foreground"><b>Upload image</b> to see preview !</p>
                </div>
            }
        </div>
    )
}
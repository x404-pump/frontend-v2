import { Image } from "@nextui-org/image";
import clsx from "clsx";
import React from "react";
import { MdPreview } from "react-icons/md";
import { useCollectionMetadata } from "./context";

interface CollectionDetailAreaProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function CollectionDetailArea({ ...props }: CollectionDetailAreaProps) {
    const [image, setImage] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>(null);
    const [desc, setDesc] = React.useState<string | null>(null);

    const { collectionMetadata } = useCollectionMetadata();

    React.useEffect(() => {
        if (collectionMetadata?.image) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                console.log('Image loaded', reader.result);
            };
            reader.readAsDataURL(collectionMetadata.image);

        }
        if (collectionMetadata?.name) {
            setName(collectionMetadata.name);
        }
        if (collectionMetadata?.description) {
            setDesc(collectionMetadata.description);
        }
    }, [collectionMetadata]);

    return (
        <div
            className={clsx(
                "flex flex-col gap-4 items-center w-full h-full p-8 rounded-[32px] bg-foreground-50 shadow",
                props.className
            )}
        >
            {image ?
                <Image
                    src={image}
                    alt="Collection Image"
                    width={"100%"}
                    height={'100%'}
                    isLoading={image ? false : true}
                    classNames={{
                        wrapper: "w-full rounded-3xl overflow-hidden",
                    }}
                /> :
                <div className="p-8 w-full h-full flex flex-col items-center justify-center bg-primary rounded-[24px]">
                    <MdPreview size={64} className="text-primary-200" />
                    <p className="text-center text-sm text-primary-foreground"><b>Upload image</b> to see preview !</p>
                </div>
            }
            <div className="flex items-center flex-col gap-2">
                <h6 className="text-base font-semibold text-foreground-900">{name}</h6>
                <p className="text-sm text-foreground-500">
                    {desc}
                </p>
            </div>
        </div>
    )
}
import clsx from "clsx";
import React from "react";

import { useCollectionMetadata } from "./context";
import { Field } from "@/components/ui";

interface CollectionDetailAreaProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function CollectionDetailArea({ ...props }: CollectionDetailAreaProps) {
    const [image, setImage] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string | null>(null);
    const [desc, setDesc] = React.useState<string | null>(null);
    const [symbol, setSymbol] = React.useState<string | null>(null);
    const [supply, setSupply] = React.useState<string | null>(null);

    const { collectionMetadata } = useCollectionMetadata();

    const fields = [
        {
            name: "Supply",
            value: collectionMetadata,
        },
        {
            name: "Symbol",
            value: symbol,
        },
    ];

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
        if (collectionMetadata?.symbol) {
            setSymbol(collectionMetadata.symbol);
        }
        if (collectionMetadata?.supply) {
            setSupply(collectionMetadata.supply);
        }
    }, [collectionMetadata]);

    return (
        <div
            className={clsx(
                "flex flex-row items-center justify-between gap-2 w-full h-fit p-3",
                "bg-foreground-50 rounded-medium",
                "border-2 border-default-200",
                "cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            )}
        >
            <img
                src={image as string}
                alt={name as string}
                className="border-2 border-default-200 w-16 aspect-square rounded-small bg-foreground-100 shadow"
            />
            <div className="flex flex-col gap-0 items-start justify-center w-full">
                <h3 className="capitalize text-base font-semibold w-full">
                    {name && name.length > 24
                        ? name.slice(0, 24) + "..."
                        : name}
                </h3>
                <p className="text-xs text-foreground-900 w-full">
                    {desc}
                </p>
                <div className="flex flex-row gap-4 items-center">
                    {fields.map((field, index) => (
                        <Field
                            key={index}
                            name={field.name}
                            value={field.value?.toString() as string}
                            direction="column"
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}
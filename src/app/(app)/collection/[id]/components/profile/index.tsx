"use client";

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Chip } from "@nextui-org/chip";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import numeral from "numeral";
import React from "react";

import { useCollection } from "../../context/collection";
import { getPrimaryColor } from "@/lib";
import { Field } from "@/components/ui";


function Profile() {
    const collection = useCollection();
    const [imgColor, setImgColor] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (collection.collection_image) {
            getPrimaryColor(collection.collection_image)
                .then((color) => {
                    // decrease the opacity of the color
                    color = color.replace("rgb", "rgba").replace(")", ", 0.75)");
                    setImgColor(color);
                })
                .catch((error) => {
                    console.error("Failed to get primary color", error);
                });
        }
    }, [collection.collection_image]);

    return (
        <div className="w-full h-fit flex flex-row gap-4 items-center justify-center">
            <div
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    background: `linear-gradient(${imgColor || "rgba(0, 0, 0, 0.1)"},rgba(255, 255, 255, 0))`,
                    borderRadius: "1rem",
                    filter: "blur(128px)",
                }}
            />
            <div className="h-fit w-fit">
                <Avatar
                    src={collection.collection_image}
                    alt={collection.collection_name}
                    classNames={{
                        base: "w-32 h-32",
                    }}
                    radius="sm"
                    showFallback
                />
            </div>
            <div className="w-full flex flex-col gap-2 items-start justify-center">
                <h1 className="w-full text-2xl md:text-4xl font-bold text-foreground-900 text-start capitalize">
                    {collection.collection_name}
                </h1>
                <Chip
                    color="default"
                    radius="full"
                    variant="light"
                    className="cursor-pointer h-fit text-foreground-500"
                    onClick={() => {
                        try {
                            if (!collection.collection_address) return;
                            copy(collection.collection_address);
                            toast.success("Copied to clipboard", {
                                type: "success",
                            });
                        } catch (error) {
                            toast.error("Failed to copy to clipboard", {
                                type: "error",
                            });
                        }
                    }}
                >
                    {truncateAddress(collection.collection_address?.toString())}
                </Chip>
            </div>
        </div>
    );
}

function Details() {
    const collection = useCollection();

    const details = [
        {
            label: "Initial Price",
            value: (collection.initial_price !== undefined && typeof collection.initial_price === 'string' ? parseInt(collection.initial_price) / 10 ** 8 : "-"),
        },
        {
            label: "Supply",
            value: collection.supply || "-",
        },
    ]

    return (
        <div className="w-full md:w-fit h-fit flex flex-row justify-between md:justify-end md:gap-4 items-center">
            {details.map((detail, index) => (
                <React.Fragment key={index}>
                    <Field
                        name={detail.label}
                        value={numeral(detail.value).format("0.0a")}
                    />
                    {index < details.length - 1 && <Divider orientation="vertical" className="w-1 rounded-full h-4" />}
                </React.Fragment>
            ))}
        </div>
    );
}
function Tools() {
    return (
        <div className="flex flex-row gap-4 items-center md:items-end w-full md:w-fit" />
    );
}
export function CollectionProfileArea() {
    return (
        <div className="my-2 w-full flex flex-col md:flex-row items-center md:items-end gap-8 relative">
            <Profile />
            <div className="w-full lg:w-fit flex flex-col gap-4 lg:items-end">
                <Tools />
                <Details />
            </div>
        </div>
    );
}
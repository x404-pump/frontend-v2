'use client';

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Tooltip } from "@nextui-org/tooltip";
import { StartUp02Icon, Tag01Icon } from "hugeicons-react";
import { Chip } from "@nextui-org/chip";
import { IoCopy } from "react-icons/io5";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

import { useCollection } from "../context/collection";
import MintToken from "./MintToken";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { Avatar } from "@nextui-org/avatar";
import numeral from "numeral";

function Field({ label, value, icon }: { label?: string; value?: string, icon?: any }) {
    return (
        <Tooltip
            classNames={{
                base: "flex flex-row gap-2 items-center",
            }}
            content={label}
        >
            <Chip
                color="default"
                radius="full"
                variant="light"
                className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity duration-200 ease-in-out"
                startContent={icon}

            >
                {value || "-"}
            </Chip>
        </Tooltip>
    );
};

function Profile() {
    const collection = useCollection();

    return (
        <div className="w-full h-fit flex flex-row gap-4 items-center justify-center">
            <div className="h-fit w-fit">
                <Avatar
                    src={collection.collection_image}
                    alt={collection.collection_name}
                    classNames={{
                        base: "w-16 h-16",
                    }}
                    radius="full"
                    showFallback
                />
            </div>
            <div className="w-full flex flex-col gap-2 items-start justify-center">
                <h1 className="w-full text-lg md:text-2xl font-bold text-foreground-900 text-start capitalize">
                    {collection.collection_name}
                </h1>
                <Tooltip
                    content={collection.collection_address}
                >
                    <Chip
                        color="default"
                        radius="full"
                        className="cursor-pointer bg-foreground-100 hover:bg-foreground-200 transition-colors duration-200 ease-in-out h-fit p-2"
                        endContent={<IoCopy />}
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
                </Tooltip>
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
            icon: <StartUp02Icon className="text-foreground-700" size={24} />,
        },
        {
            label: "Supply",
            value: collection.supply || "-",
            icon: <Tag01Icon className="text-foreground-700" size={24} />,
        },
        /**
         * @todo Implement these fields
         */
        // {
        //     label: "Top Bid",
        //     value: "-",
        //     icon: <Award02Icon className="text-foreground-700" size={24} />
        // },
        // {
        //     label: "Owners",
        //     value: "-",
        //     icon: <UserShield02Icon className="text-foreground-700" size={24} />
        // }
    ]

    return (
        <div className="w-full md:w-fit h-fit flex flex-row justify-between md:justify-end md:gap-4 items-center">
            {details.map((detail, index) => (
                <React.Fragment key={index}>
                    <Field
                        label={detail.label}
                        value={numeral(detail.value).format("0.0a")}
                        icon={detail.icon}
                    />
                    {index < details.length - 1 && <Divider orientation="vertical" className="w-1 rounded-full h-4" />}
                </React.Fragment>
            ))}
        </div>
    );
}
function Tools() {
    return (
        <div className="flex flex-row gap-4 items-center md:items-end w-full md:w-fit">
            <MintToken />
        </div>
    );
}
export function CollectionProfileArea() {
    return (
        <div className="my-2 w-full flex flex-col md:flex-row items-center md:items-end gap-8">
            <Profile />
            <div className="w-full flex flex-col gap-4 items-end">
                <Tools />
                <Details />
            </div>
        </div>
    );
}
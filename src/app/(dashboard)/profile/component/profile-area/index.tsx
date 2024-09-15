'use client';

import { useCollection } from "@/app/(dashboard)/collection/[id]/context/collection";
import { truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import copy from "copy-to-clipboard";
import { CheckmarkBadge01Icon } from "hugeicons-react";
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";

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
    const {account, wallet } = useWallet();

    return (
        <div className="w-fit h-fit flex flex-col gap-4 items-start">
            <h1 className="text-2xl font-semibold text-primary-foreground">Profile</h1>
            <Tooltip
                content={"Collection Address"}
            >
                <Chip
                    color="secondary"
                    radius="full"
                    className="cursor-pointer"
                    endContent={<IoCopy />}
                    onClick={() => {
                        try {
                            if (!account?.address) return;
                            copy(account.address);
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
                    {truncateAddress(account?.address) || "No address available"}
                </Chip>
            </Tooltip>
            <div className="w-full">
            </div>
        </div>
    );
}
export default function Index() {
    const { account } = useWallet();

    return (
        <div className="bg-primary rounded-3xl p-8 w-full flex flex-col md:flex-row items-center md:items-end gap-8">
            <Profile />
            <div className="w-full flex flex-col gap-4 items-end">
            </div>
        </div>
    )
}
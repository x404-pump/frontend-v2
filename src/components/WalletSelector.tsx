'use client';

import {
    AnyAptosWallet,
    WalletItem,
    getAptosConnectWallets,
    isInstallRequired,
    partitionWallets,
    useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useMedia } from "@/hooks";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

function ConnectWalletDialog() {
    const { wallets = [], connected, account, isLoading, disconnect } = useWallet();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const { isMobile } = useMedia();
    const {
        /** Wallets that use social login to create an account on the blockchain */
        aptosConnectWallets,
        /** Wallets that use traditional wallet extensions */
        otherWallets,
    } = getAptosConnectWallets(wallets);

    const {
        /** Wallets that are currently installed or loadable. */
        defaultWallets,
        /** Wallets that are NOT currently installed or loadable. */
        moreWallets,
    } = partitionWallets(otherWallets);

    if (connected) return null;

    return (
        <>
            <Button fullWidth variant={'solid'} size={'md'} radius="full" className="bg-foreground-900 text-foreground-100 font-semibold" isLoading={isLoading} onClick={onOpen}>
                {isLoading ? "Loading..." : "Connect Wallet"}
            </Button>
            <Modal className="max-h-screen overflow-auto py-4" isOpen={isOpen} onOpenChange={onOpenChange} radius="lg" size="lg">
                <ModalContent>
                    <ModalHeader className="flex flex-col items-center">
                        <div className="flex flex-col text-center leading-snug">
                            <span>Log in or sign up</span>
                            <span>with Social + Aptos Connect</span>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-3 pt-3">
                            {aptosConnectWallets.map((wallet) => (
                                <AptosConnectWalletRow key={wallet.name} wallet={wallet} onConnect={onClose} />
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-4 text-muted-foreground">
                            <div className="h-px w-full bg-secondary" />
                            Or
                            <div className="h-px w-full bg-secondary" />
                        </div>
                        <div className="flex flex-col gap-3 pt-3">
                            {defaultWallets.map((wallet) => (
                                <WalletRow key={wallet.name} wallet={wallet} onConnect={onClose} />
                            ))}
                            {/* {!!moreWallets.length && (
                    // <Collapsible className="flex flex-col gap-3">
                    //     <CollapsibleTrigger asChild>
                    //         <Button size="sm" variant="ghost" className="gap-2">
                    //             More wallets <ChevronDown />
                    //         </Button>
                    //     </CollapsibleTrigger>
                    //     <CollapsibleContent className="flex flex-col gap-3">
                    //         {moreWallets.map((wallet) => (
                    //             <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
                    //         ))}
                    //     </CollapsibleContent>
                    // </Collapsible>
                )} */}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    );
}

interface WalletRowProps {
    wallet: AnyAptosWallet;
    onConnect?: () => void;
}

function WalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
        <WalletItem
            wallet={wallet}
            onConnect={onConnect}
            className="flex items-center justify-between px-4 py-3 gap-4 border-2 border-default rounded-2xl"
        >
            <div className="flex items-center gap-4">
                <WalletItem.Icon className="h-6 w-6" />
                <WalletItem.Name className="text-base font-normal" />
            </div>
            {isInstallRequired(wallet) ? (
                <Button size="sm" variant="ghost">
                    <WalletItem.InstallLink />
                </Button>
            ) : (
                <WalletItem.ConnectButton asChild>
                    <Button size="sm" className="bg-secondary-400">Connect</Button>
                </WalletItem.ConnectButton>
            )}
        </WalletItem>
    );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
        <WalletItem wallet={wallet} onConnect={onConnect}>
            <WalletItem.ConnectButton asChild>
                <Button size="lg" variant="bordered" className="w-full gap-4">
                    <WalletItem.Icon className="h-5 w-5" />
                    <WalletItem.Name className="text-base font-normal" />
                </Button>
            </WalletItem.ConnectButton>
        </WalletItem>
    );
}
export { ConnectWalletDialog, WalletRow, AptosConnectWalletRow }
"use client";

import { Logo } from "@/components/icons";
import { WalletSortingOptions, useWallet, groupAndSortWallets, AboutAptosConnect, AptosPrivacyPolicy, AnyAptosWallet, WalletItem, isInstallRequired, AboutAptosConnectEducationScreen } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/button";
import { ModalContent, ModalHeader, ModalBody, Modal, useDisclosure } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";
import { MultiplicationSignIcon, Wallet01Icon } from "hugeicons-react";
import React from "react";

interface ConnectWalletDialogProps extends Partial<WalletSortingOptions> {}

function ConnectWalletDialog({
    ...walletSortingOptions
}: ConnectWalletDialogProps) {
    const { wallets = [] , isLoading} = useWallet();
    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

    const { aptosConnectWallets, availableWallets, installableWallets } =
        groupAndSortWallets(wallets, walletSortingOptions);

    const hasAptosConnectWallets = !!aptosConnectWallets.length;

    return (
        <>
            <Button
                fullWidth
                radius="sm"
                color="primary"
                isLoading={isLoading}
                onClick={onOpen}
                startContent={<Wallet01Icon size={16} />}
            >
                Connect Wallet
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg" hideCloseButton
                className="rounded-[32px] relative"
                backdrop="transparent"
                size="sm"
                classNames={{
                    wrapper: "bg-primary/5 w-fit h-fit left-1/2 top-1/2 !-translate-x-1/2 !-translate-y-1/2 backdrop-blur-sm rounded-[32px] p-6 border-t border-primary/50",
                }}
            >
                <ModalContent className="overflow-visible sm:m-0 shadow-none">
                    <ModalHeader className="flex flex-row justify-between items-center">
                        <Logo className="h-8 w-8" />
                        <h6>Connect Wallet</h6>
                        <Button
                            isIconOnly
                            radius="full"
                            size="sm"
                            variant="light"
                            className="text-default-500 data-[hover=true]:bg-default-100"
                            onClick={onClose}
                        >
                            <MultiplicationSignIcon size={24} />
                        </Button>
                    </ModalHeader>
                    <ModalBody className="overflow-auto rounded-[32px]">
                        <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
                            {hasAptosConnectWallets && (
                                <div className="flex flex-col gap-2 pt-3">
                                    <div className="grid grid-cols-3 gap-3">
                                        {availableWallets.map((wallet) => (
                                            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
                                        ))}
                                        {installableWallets.map((wallet) => (
                                            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 pt-4 text-foreground-500">
                                        <div className="h-px w-full bg-foreground-500" />
                                        Or
                                        <div className="h-px w-full bg-foreground-500" />
                                    </div>
                                    {aptosConnectWallets.map((wallet) => (
                                        <AptosConnectWalletRow
                                            key={wallet.name}
                                            wallet={wallet}
                                            onConnect={close}
                                        />
                                    ))}
                                    <p className="flex gap-1 justify-center items-center text-foreground-500 text-sm">
                                        Learn more about{" "}
                                        <AboutAptosConnect.Trigger className="flex gap-1 py-3 font-semibold items-center text-foreground">
                                            Aptos Connect
                                        </AboutAptosConnect.Trigger>
                                    </p>
                                    <AptosPrivacyPolicy className="flex flex-col items-center py-1">
                                        <p className="text-xs text-foreground-500 leading-5">
                                            <AptosPrivacyPolicy.Disclaimer />{" "}
                                            <AptosPrivacyPolicy.Link className="text-muted-foreground underline underline-offset-4" />
                                            <span className="text-muted-foreground">.</span>
                                        </p>
                                        <AptosPrivacyPolicy.PoweredBy className="flex gap-1.5 items-center text-xs leading-5 text-foreground-500" />
                                    </AptosPrivacyPolicy>
                                </div>
                            )}

                            <div className="flex flex-col gap-3 pt-3">
                                {/* {installableWallets.map((wallet) => (
                        <WalletRow
                            key={wallet.name}
                            wallet={wallet}
                            onConnect={close}
                        />
                    ))} */}
                            </div>
                        </AboutAptosConnect>
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
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const handleWalletItemClick = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }

    return (
        <WalletItem
            wallet={wallet}
            onConnect={onConnect}
        >
            <Tooltip
                content={wallet.name}
                placement="top"
                color="primary"
                className="rounded-lg"
            >
                <div
                    className="rounded-[20px] hover:bg-foreground-100 p-4 w-fit aspect-square"
                    tabIndex={0}
                    role="button"
                    onClick={handleWalletItemClick}
                >

                    {isInstallRequired(wallet) ? (
                        <WalletItem.InstallLink>
                            <Button ref={buttonRef} size="sm" radius="full" variant="light" className="w-full h-full data-[hover=true]:bg-transparent">
                                <WalletItem.Icon className="h-8 w-8" />
                            </Button>
                        </WalletItem.InstallLink>
                    ) : (
                        <WalletItem.ConnectButton asChild>
                            <Button ref={buttonRef} size="sm" radius="full" variant="light" className="w-full h-full data-[hover=true]:bg-transparent">
                                <WalletItem.Icon className="h-8 w-8" />
                            </Button>
                        </WalletItem.ConnectButton>
                    )}
                </div>
            </Tooltip>
        </WalletItem>
    );
}

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
    return (
        <WalletItem wallet={wallet} onConnect={onConnect}>
            <WalletItem.ConnectButton asChild>
                <Button size="lg" variant="solid" className="w-full gap-4 bg-foreground-100 text-foreground-900">
                    <WalletItem.Icon className="h-5 w-5" />
                    <WalletItem.Name className="text-base font-normal" />
                </Button>
            </WalletItem.ConnectButton>
        </WalletItem>
    );
}

function renderEducationScreen(screen: AboutAptosConnectEducationScreen) {
    return (
        <>
            <Modal className="grid grid-cols-[1fr_4fr_1fr] items-center space-y-0">
                <Button isIconOnly onClick={screen.cancel}>
                    <MultiplicationSignIcon size={24} />
                </Button>
            </Modal>

            <div className="flex h-[162px] pb-3 items-end justify-center">
                <screen.Graphic />
            </div>
            <div className="flex flex-col gap-2 text-center pb-4">
                <screen.Title className="text-xl" />
                <screen.Description className="text-sm text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a]:text-foreground" />
            </div>

            <div className="grid grid-cols-3 items-center">
                <Button
                    size="sm"
                    variant="solid"
                    onClick={screen.back}
                    className="justify-self-start"
                >
                    Back
                </Button>
                <div className="flex items-center gap-2 place-self-center">
                    {screen.screenIndicators.map((ScreenIndicator, i) => (
                        <ScreenIndicator key={i} className="py-4">
                            <div className="h-0.5 w-6 transition-colors bg-muted [[data-active]>&]:bg-foreground" />
                        </ScreenIndicator>
                    ))}
                </div>
                <Button
                    size="sm"
                    variant="solid"
                    onClick={screen.next}
                    className="gap-2 justify-self-end"
                >
                    {screen.screenIndex === screen.totalScreens - 1 ? "Finish" : "Next"}

                </Button>
            </div>
        </>
    );
}

export default ConnectWalletDialog;
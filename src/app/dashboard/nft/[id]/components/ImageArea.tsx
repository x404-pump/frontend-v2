'use client';

import { Image } from "@nextui-org/image";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { useNft } from "../contexts/nft";
import { Button } from "@nextui-org/button";
import { ArrowExpandIcon } from "hugeicons-react";

export default function ImageArea() {
    const nft = useNft();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    return (
        <div className="relative w-full h-full">
            <Image
                src={nft.token_uri}
                alt={nft.token_name}
                width={'100%'}
                height={'auto'}
                isLoading={!nft.token_uri}
                shadow="md"
                className="aspect-square md:aspect-video object-cover"
                classNames={{
                    wrapper: "rounded-[32px] overflow-hidden",
                }}
            />
            <Button
                variant="light"
                radius="full"
                isIconOnly
                onClick={onOpen}
                className="absolute top-4 right-4 z-10 bg-white/25 backdrop-blur-2xl"
            >
                <ArrowExpandIcon size={24} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} placement="center" backdrop="blur">
                <ModalBody>
                    <ModalContent>
                        <Image
                            src={nft.token_uri}
                            alt={nft.token_name}
                            width={'fit-content'}
                            height={'fit-content'}
                            shadow="md"
                        />
                    </ModalContent>
                </ModalBody>
            </Modal>

        </div>
    )
}
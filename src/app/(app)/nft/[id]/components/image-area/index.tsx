"use client";

import React from "react";
import { Image } from "@nextui-org/image";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { ArrowExpandIcon } from "hugeicons-react";

import { useNft } from "../../contexts/nft";
import { getImage } from "@/lib";

export default function ImageArea() {
    const nft = useNft();
    const [imageSrc, setImageSrc] = React.useState<string | null>();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const fetchImage = React.useCallback(async () => {
        const image = await getImage(nft);

        setImageSrc(image);
    }, [nft]);

    React.useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    return (
        <div className="relative w-full max-w-screen-sm h-full">
            <Image
                src={imageSrc || ""}
                alt={nft.token_name}
                width={'100%'}
                height={'auto'}
                isLoading={!imageSrc}
                shadow="md"
                className="aspect-square !h-full object-cover"
                classNames={{
                    wrapper: "rounded-large h-full",
                }}
            />
            <Button
                variant="light"
                radius="full"
                isIconOnly
                onClick={onOpen}
                className="absolute top-4 right-4 z-10 bg-white/25 border-2 border-default/25 backdrop-blur-2xl"
            >
                <ArrowExpandIcon size={24} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} placement="center" backdrop="blur" size="4xl">
                <ModalBody>
                    <ModalContent>
                        <Image
                            src={imageSrc || ""}
                            alt={nft.token_name}
                            width={'100%'}
                            height={'100%'}
                            shadow="md"
                        />
                    </ModalContent>
                </ModalBody>
            </Modal>

        </div>
    )
}
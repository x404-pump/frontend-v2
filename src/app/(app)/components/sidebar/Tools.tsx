import { ColumnContainer } from "@/components/ui";
import { Button } from "@nextui-org/button";
import { Add01Icon } from "hugeicons-react";
import Link from "next/link";

export default function Tools() {
    return (
        <ColumnContainer>
            <Button
                as={Link}
                href="/create-collection"
                variant="faded"
                radius="sm"
                fullWidth
                className="border-default-200 text-foreground-900 h-fit py-2"
                startContent={<Add01Icon size={16} />}
            >
                Create Collection
            </Button>
        </ColumnContainer>
    )
}
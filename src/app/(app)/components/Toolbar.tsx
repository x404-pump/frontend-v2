import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Toolbar() {
    return (
        <div className="flex flex-row items-center justify-end gap-4 w-full">
            <Button
                as={Link}
                color="primary"
                radius="full"
                href="/create-collection"

            >
                Create Collection
            </Button>
        </div>
    )
}